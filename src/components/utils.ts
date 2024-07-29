import { ReducedResourceItem, ResourceItem } from "../types/types";

let counter = 0
const materialNames: string[] = [
  "Rubber",
  "Glue",
  "Steel",
  "Wood",
  "Plastic",
  "Glass",
  "Ceramic",
  "Concrete",
  "Copper",
  "Aluminum",
  "Fiberglass",
  "Carbon Fiber",
  "Leather",
  "Paper",
  "Foam",
  "Silicon",
  "Granite",
  "Marble",
  "Brass",
  "Bronze",
];

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
  const reducedResourceItemObj = changeNameValue(reduceObject(resourceItemObj, keysToRemove));
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

const changeNameValue = (obj: ReducedResourceItem) : ReducedResourceItem => {
  const randomName = generateUniqueName()
  obj.name = randomName
  return obj
}

const generateUniqueName= (): string => {
  counter++;  
  return `${counter}_${materialNames[generateRandomNumber()]}_${Math.random()
    .toString(36)
    .substr(2, 2)}`;
}

const generateRandomNumber = () : number => {
  return +(Math.random() * 20).toFixed(0);
}