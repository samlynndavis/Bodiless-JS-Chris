// Normal flow container and tokens are the same in both edit/static
export { default as FlowContainerClean } from './FlowContainerClean';
export { default as cxFlowContainer } from './tokens';
// Base token collection is the same in both edit and static.
// Exported directly from its location so it cannot be shadowed.
export { default as cxFlowContainerBase } from './tokens/cxFowContainer';
// Static flow container has edit/static alternatives.
export * from './index.bl-edit';
