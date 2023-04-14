import type { GeneralLink, PLPFilter, Maybe } from "./types";

export function resolveGeneralLink(
  generalLink: Maybe<GeneralLink>,
  linkContext?: Maybe<LinkContext>
): GeneralLinkResponse {
  if (!generalLink) return { path: "/", target: "_self" };

  switch (generalLink.type) {
    case "CategoryLandingPage":
      return {
        path: `/department/${generalLink.category1}/${generalLink.slug}`,
        target: "_self",
      };

    case "ExternalLink":
      return { path: generalLink.link, target: "_blank" };

    case "InternalLink":
      return { path: generalLink.path, target: "_self" };

    case "ProductListPage": {
      if (generalLink.vanityUrl) {
        return {
          path: generalLink.vanityUrl,
          target: "_self",
        };
      }

      const path =
        buildPDPFilterPath(generalLink.filters) +
        buildStorefrontContextParam(linkContext);

      return {
        path,
        target: "_self",
      }; // TODO refactor path to prioritize URLS in the front
    }

    case "StorefrontPage":
      return { path: `/${generalLink.slug}`, target: "_self" };

    case "DepartmentPage":
      return { path: `/department/${generalLink.slug}`, target: "_self" };

    default:
      return { path: "/", target: "_self" };
  }
}

/**
 * tranforms a series for filters into a plp path
 */
function buildPDPFilterPath(filters: PLPFilter[]): string {
  if (!filters.length) return "/";
  const path = filters
    .map(({ filterValue }) => searchSlugify(filterValue))
    .join("/");

  const map = filters.map(({ filterKey }) => filterKey).join(",");

  return `/${path}?map=${map}`;
}

/**
 * adds storefront context param for links generated from storefronts,
 * this allows us to put the storefront nav on PLPs where the param is present
 */
function buildStorefrontContextParam(linkContext: Maybe<LinkContext>) {
  if (!linkContext?.storefrontSlug) return "";

  return `&storefrontCtx=${linkContext.storefrontSlug}`;
}

/** *****************************************
 * HELPER METHODS FROM SEARCH RESULTS APPS
 * Have not found a mechanism to import he search slugify method from the search results app: https://github.com/vtex-apps/search-result/blob/master/react/utils/slug.ts
 * So the source code has been copied here
 * method needed to resolve PLP filter links based on how they slugify
 ***************************************** */

const removeAccents = (str: string) => {
  const from =
    "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";

  const to =
    "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";

  let newStr = str.slice(0);

  for (let i = 0; i < from.length; i++) {
    newStr = newStr.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  return newStr;
};

function searchSlugify(str: string) {
  // eslint-disable-next-line no-useless-escape
  const replaced = str.replace(/[*+~.()'"!:@&\[\]`,/ %$#?{}|><=_^]/g, "-");

  return removeAccents(replaced).toLowerCase();
}

/** *****************************************
 * TYPES
 ***************************************** */

type LinkContext = {
  storefrontSlug?: Maybe<string>;
};

type GeneralLinkResponse = {
  path: string;
  target: "_blank" | "_self";
};
