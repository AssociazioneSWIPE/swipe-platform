import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
if (!projectId) throw new Error('Set SANITY_STUDIO_PROJECT_ID to the existing SWIPE Sanity project ID.');

export default defineConfig({ name: 'default', title: 'SWIPE', projectId, dataset: process.env.SANITY_STUDIO_DATASET || 'production', plugins: [deskTool()], schema: { types: schemaTypes } });
