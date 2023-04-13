export type Maybe<T> = T | null | undefined;

export type PLPFeatureHeader = {
  text: string;
  title: string;
};

export type PLPFeatureHeaderGeneralLink = {
  type: "InformationLink";
  sections: PLPFeatureHeader[];
};

export type GeneralLink =
  | GeneralLinkStorefrontLink
  | GeneralLinkContentLandingPageLink
  | GeneralLinkExternalLink
  | GeneralLinkInternalLink
  | GeneralLinkPLPLink
  | GeneralLinkDepartmentLink
  | PLPFeatureHeaderGeneralLink;

export type GeneralLinkKind =
  | "ProductListPage"
  | "StorefrontPage"
  | "CategoryLandingPage"
  | "ExternalLink"
  | "InternalLink"
  | "DepartmentPage";

export type GeneralLinkStorefrontLink = {
  type: "StorefrontPage";
  name: string;
  slug: string;
};

export type GeneralLinkContentLandingPageLink = {
  type: "CategoryLandingPage";
  name: string;
  slug: string;
  category1: string;
};

export type GeneralLinkExternalLink = {
  type: "ExternalLink";
  link: string;
};

export type GeneralLinkInternalLink = {
  type: "InternalLink";
  name: string;
  path: string;
};

export type GeneralLinkDepartmentLink = {
  type: "DepartmentPage";
  name: string;
  slug: string;
};

export type GeneralLinkPLPLink = {
  type: "ProductListPage";
  filters: PLPFilter[];
  vanityUrl: string | null;
};

export type PLPFilter = {
  filterKey: string;
  filterValue: string;
};
