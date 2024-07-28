import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import OutputField from '../components/OutputField';

export type customButtonType = {
  iconName: string;
  onClick: () => void
  content?: string;
  isDisabled?: boolean
};

export type iconListType = {
  [key: string]: IconDefinition;
};

export interface ResourceItem {
  id: string;
  name: string;
  parameters?: { id: string; name: string }[];
  materials?: { id: string; name: string }[];
}

export interface ReducedResourceItem {
  name: string;
  parameters?: { name: string }[];
  materials?: { name: string }[];
}

export type outputFieldType = {
  reducedResourceItemObj: ReducedResourceItem
}

export type textFieldType = {
  handleSubmit: (objectText: ReducedResourceItem) => void
};

export type inputFieldStateType = {
  value: ResourceItem
}

export type inputErrorStateType = {
  isError: boolean
  message: string
}