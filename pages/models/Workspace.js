import mongoose from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

// STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL
const WorkspaceSchema = new mongoose.Schema({
  name: String,
});

const Workspace = mongoose.model('Workspace', WorkspaceSchema);

const customizationOptions = {}; 
const WorkspaceTC = composeMongoose(Workspace, customizationOptions);

schemaComposer.Query.addFields({
    workspaceMany: WorkspaceTC.mongooseResolvers.findMany(),
});

schemaComposer.Mutation.addFields({
    workspaceCreateOne: WorkspaceTC.mongooseResolvers.createOne(),
});

export const graphqlSchema = schemaComposer.buildSchema();
