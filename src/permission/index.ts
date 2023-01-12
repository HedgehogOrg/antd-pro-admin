type CollectionType = {
  [key: string]: any
};
class PermissionCollection {
  collection: CollectionType = { menu: {} };
}

export default new PermissionCollection();
