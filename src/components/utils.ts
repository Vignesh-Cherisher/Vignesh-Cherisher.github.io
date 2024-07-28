import { ReducedResourceItem, ResourceItem } from "../types/types";

export class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParseError";
  }
}

export const convertIdKey = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(convertIdKey);
  }

  if (typeof obj === "object" && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === "_id") {
          newObj["id"] = convertIdKey(obj[key]);
        } else {
          newObj[key] = convertIdKey(obj[key]);
        }
      }
    }
    return newObj;
  }
  return obj;
};

export const isResourceItem = (object: any): object is ResourceItem => {
  const isParameterOrMaterial = (item: any) =>
    typeof item === "object" &&
    item !== null &&
    typeof item.id === "string" &&
    typeof item.name === "string";

  return (
    typeof object === "object" &&
    object !== null &&
    typeof object.id === "string" &&
    typeof object.name === "string" &&
    (object.parameters === undefined ||
      (Array.isArray(object.parameters) &&
        object.parameters.every(isParameterOrMaterial))) &&
    (object.materials === undefined ||
      (Array.isArray(object.materials) &&
        object.materials.every(isParameterOrMaterial)))
  );
};

export const reduceResourceItemObj = (
  resourceItemObj: ResourceItem
): ReducedResourceItem => {
  const keysToRemove = ["id"];
  const reducedResourceItemObj = reduceObject(resourceItemObj, keysToRemove);
  return reducedResourceItemObj as ReducedResourceItem;
};

const reduceObject = (obj: any, keysToRemove: string[]): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => reduceObject(item, keysToRemove));
  } else if (typeof obj === "object" && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      if (!keysToRemove.includes(key)) {
        newObj[key] = reduceObject(obj[key], keysToRemove);
      }
    }
    return newObj;
  } else {
    return obj;
  }
};
