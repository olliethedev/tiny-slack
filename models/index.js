import { composeMongoose } from 'graphql-compose-mongoose';
import { SchemaComposer } from 'graphql-compose';
import Workspace from './Workspace';
import User from './User';
import Channel from './Channel';


const schemaComposer = new SchemaComposer(); //todo: debug, potential memory leak accross lambda rebuilds

const customizationOptions = {
    schemaComposer,
};

const WorkspaceTC = composeMongoose(Workspace, customizationOptions);
const UserTC = composeMongoose(User, customizationOptions);
const ChannelTC = composeMongoose(Channel, customizationOptions);

schemaComposer.Query.addFields({
    workspaceOne: WorkspaceTC.mongooseResolvers.findOne(),
    workspaceMany: WorkspaceTC.mongooseResolvers.findMany(),
    userOne: UserTC.mongooseResolvers.findOne(),
    userMany: UserTC.mongooseResolvers.findMany(),
    channelMany: ChannelTC.mongooseResolvers.findMany(),
});

schemaComposer.Mutation.addFields({
    workspaceCreateOne: WorkspaceTC.mongooseResolvers.createOne(),
    userCreateOne: UserTC.mongooseResolvers.createOne(),
    channelOne: ChannelTC.mongooseResolvers.createOne(),
});

export default schemaComposer.buildSchema();
