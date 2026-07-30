import { gql } from "@apollo/client";

export const buttons: string[] = ["All", "Indica", "Sativa", "Hybrid"];

export enum Alphabet {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
  I = "I",
  J = "J",
  K = "K",
  L = "L",
  M = "M",
  N = "N",
  O = "O",
  P = "P",
  Q = "Q",
  R = "R",
  S = "S",
  T = "T",
  U = "U",
  V = "V",
  W = "W",
  X = "X",
  Y = "Y",
  Z = "Z",
}

export const SingleStrain = gql`
  fragment Media on MediaItem {
    altText
    title
    id
    sourceUrl
    srcSet(size: $imageSize)
    mediaDetails {
      width
      height
    }
  }
  fragment ConditionLinkWithTypes on Condition {
    id
    title
    uri
    conditionTypes {
      nodes {
        name
      }
    }
  }

  query SingleStrain(
    $slug: ID! = ""
    $imageSize: MediaItemSizeEnum = _2048X2048
  ) {
    strain(id: $slug, idType: SLUG) {
      id: databaseId
      content
      title
      uri
      featuredImage {
        node {
          ...Media
        }
      }
      aromas {
        nodes {
          name
        }
      }
      flavors {
        nodes {
          name
        }
      }
      negativeEffects {
        nodes {
          name
        }
      }
      positiveEffects {
        nodes {
          name
        }
      }
      strainTypes {
        nodes {
          name
          slug
        }
      }
      terpenes {
        nodes {
          name
          details: terpeneDetails {
            color
          }
        }
      }
      details: strainDetails {
        cannabinoids {
          abbreviation
          name
          quantityStart
          quantityEnd
          extraInfo
        }
        composition {
          quantity
          type
        }
        conditionsDescription
        conditions {
          condition {
            ...ConditionLinkWithTypes
          }
          description
        }
        dosing
        effectsExtraInfo
        faqs {
          title
          content
        }
        flavonoids
        growing
        growingImage {
          ...Media
        }
        growingHumidity
        growingHeight
        growingFlowering
        terpenesDescription
        thc {
          quantityStart
          quantityEnd
          extraInfo
        }
      }
    }
  }
`;

export const SearchStrainByString = gql`
  fragment StrainExcerpt on Strain {
    id
    title
    uri
    date
    modified
    featuredImage {
      node {
        ...Media
        __typename
      }
      __typename
    }
    strainTypes {
      nodes {
        name
        slug
        __typename
      }
      __typename
    }
    details: strainDetails {
      cannabinoids {
        abbreviation
        quantityStart
        quantityEnd
        __typename
      }
      thc {
        quantityStart
        quantityEnd
        __typename
      }
      __typename
    }
    __typename
  }

  fragment Media on MediaItem {
    altText
    title
    id
    sourceUrl
    srcSet(size: $imageSize)
    mediaDetails {
      width
      height
      __typename
    }
    __typename
  }

  query SearchStrains(
    $imageSize: MediaItemSizeEnum = LARGE
    $languageCode: LanguageCodeFilterEnum = DEFAULT
    $search: String = ""
    $after: String = null
    $limit: Int = 12
    $where: RootQueryToStrainConnectionWhereArgs = {
      offsetPagination: { offset: 0, size: 12 }
      titleStartsWith: "b"
    }
  ) {
    strains(where: $where) {
      nodes {
        ...StrainExcerpt
        __typename
      }
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
          __typename
        }
      }
    }
    contentNodes(
      where: {
        language: $languageCode
        search: $search
        contentTypes: [STRAIN]
      }
      after: $after
      first: $limit
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        contentType {
          node {
            name
          }
        }
        ...StrainExcerpt
      }
    }
  }
`;

export const SearchStrainByInitial = gql`
  fragment StrainExcerpt on Strain {
    id
    title
    uri
    date
    modified
    featuredImage {
      node {
        ...Media
        __typename
      }
      __typename
    }
    strainTypes {
      nodes {
        name
        slug
        __typename
      }
      __typename
    }
    details: strainDetails {
      cannabinoids {
        abbreviation
        quantityStart
        quantityEnd
        __typename
      }
      thc {
        quantityStart
        quantityEnd
        __typename
      }
      __typename
    }
    __typename
  }

  fragment Media on MediaItem {
    altText
    title
    id
    sourceUrl
    srcSet(size: $imageSize)
    mediaDetails {
      width
      height
      __typename
    }
    __typename
  }

  query SearchStrains(
    $imageSize: MediaItemSizeEnum = LARGE
    $languageCode: LanguageCodeFilterEnum = DEFAULT
    $search: String = ""
    $after: String = null
    $limit: Int = 12
    $titleStartsWith: String = "a"
  ) {
    strains(
      where: {
        offsetPagination: { offset: 0, size: 12 }
        titleStartsWith: $titleStartsWith
      }
    ) {
      nodes {
        ...StrainExcerpt
        __typename
      }
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
          __typename
        }
      }
    }
    contentNodes(
      where: {
        language: $languageCode
        search: $search
        contentTypes: [STRAIN]
      }
      after: $after
      first: $limit
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        contentType {
          node {
            name
          }
        }
        ...StrainExcerpt
      }
    }
  }
`;
