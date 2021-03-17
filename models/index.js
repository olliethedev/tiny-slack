import { composeMongoose } from 'graphql-compose-mongoose';
import { SchemaComposer } from 'graphql-compose';
import Workspace from './Workspace';


const schemaComposer = new SchemaComposer();

const customizationOptions = {
    schemaComposer
};

const WorkspaceTC = composeMongoose(Workspace, customizationOptions);

schemaComposer.Query.addFields({
    workspaceMany: WorkspaceTC.mongooseResolvers.findMany(),
});

schemaComposer.Mutation.addFields({
    workspaceCreateOne: WorkspaceTC.mongooseResolvers.createOne(),
});

export default schemaComposer.buildSchema();
