import { composeMongoose } from "graphql-compose-mongoose";
import { SchemaComposer } from "graphql-compose";

let schema;

const manualAdminCheck = (context, email) =>
  new Promise((resolve, reject) => {
    console.log({ clientContext: context.clientContext });
    if (process.env.CONTEXT === "dev") { // skip authentication on for local dev
      resolve();
    } else {
      if(context.clientContext.user.email===email)
        resolve();
      else
        reject("Authentication failed!");
    }
  });

const getSchema = async () => {
  //make sure mongo connection is initialized before using the models
  const Workspace = require("./Workspace").default;
  const User = require("./User").default;
  const Channel = require("./Channel").default;
  const Message = require("./Message").default;
  if (!schema || process.env.CONTEXT !== "dev") { // dont cache schema on remote build because mongodb connection is new every function call
    const schemaComposer = new SchemaComposer();
    const customizationOptions = {
      schemaComposer,
    };
    //Declare the type composers from mongo schemas
    const WorkspaceTC = composeMongoose(Workspace, customizationOptions);
    const UserTC = composeMongoose(User, customizationOptions);
    const ChannelTC = composeMongoose(Channel, customizationOptions);
    const MessageTC = composeMongoose(Message, customizationOptions);

    //Fill in relationships, aka inflate object references
    WorkspaceTC.addRelation("users", {
      resolver: () => UserTC.mongooseResolvers.findMany(),
      prepareArgs: { filter: (source) => ({ _id: { $in: source.users } }) },
      projection: { users: 1 },
    });

    MessageTC.addRelation("user", {
      resolver: () => UserTC.mongooseResolvers.findOne(),
      prepareArgs: { filter: (source) => ({ _id: source.user }) },
      projection: { user: 1 },
    });

    //Add virtual functions
    WorkspaceTC.addFields({ userCount: "Int" });

    //Set GraphQL Queries from mongoose
    schemaComposer.Query.addFields({
      workspaceOne: WorkspaceTC.mongooseResolvers.findOne(),
      workspaceMany: WorkspaceTC.mongooseResolvers.findMany(),
      userOne: UserTC.mongooseResolvers.findOne(),
      userMany: UserTC.mongooseResolvers.findMany(),
      channelMany: ChannelTC.mongooseResolvers.findMany(),
      messageMany: MessageTC.mongooseResolvers.findMany(),
    });

    //GraphQL Custom Mutations
    const userCreateOne = {
      type: WorkspaceTC,
      args: {
        workspaceId: "MongoID!",
        name: "String",
        email: "String!",
        avatar_url: "String",
      },
      resolve: async (source, args, context, info) =>
        manualAdminCheck(context, args.email).then(() =>
          User.createIfNeededAndAddToWorkspace(
            args.name,
            args.email,
            args.avatar_url,
            args.workspaceId
          )
        ),
    };

    const messageCreateOne = {
      type: MessageTC,
      args: {
        channelId: "MongoID!",
        content: "String!",
        email: "String!",
      },
      resolve: async (source, args, context, info) =>
        manualAdminCheck(context, args.email).then(() =>
          Message.createWithUserEmail(args.channelId, args.content, args.email)
        ),
    };

    //Set GraphQL Mutations from mongoose
    schemaComposer.Mutation.addFields({
      workspaceCreateOne: WorkspaceTC.mongooseResolvers.createOne(),
      userCreateOne,
      channelCreateOne: ChannelTC.mongooseResolvers.createOne(),
      messageCreateOne,
    });
    schema = schemaComposer.buildSchema();
  }
  return schema;
};

export default getSchema;
