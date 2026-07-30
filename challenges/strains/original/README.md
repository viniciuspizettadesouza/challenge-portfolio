## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[http://localhost:3000/api/hello](http://localhost:3000/api/hello) is an endpoint that uses [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers). This endpoint can be edited in `app/api/hello/route.ts`.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Project Overview

We'd like you to recreate 2 pages from our strains section.
The Design to be implemented can be found on a figma file [here](https://www.figma.com/file/ttJLrj5n8xoqARPtOLbTIc/Strains?t=W2SIY5ndN5UNDsyl-6) and should be done by using [Tailwind](https://tailwindcss.com/).
The data is available through our GraphQL API and feel free to use whatever GraphQL client you want.

### Strain Listing/Searching

This page should list all the strains available through our API and also allow for some basic search (by A-Z and "type").

### Strain Single

Show some basic information about a give strain.

## GraphQL

Endpoint: https://dev.admin.leafwell.com/wp/graphql

Code for strains list/searching:

```
fragment StrainExcerpt on Strain {
  id
  title
  uri
  date
  modified
  featuredImage {
    node {
      ...Media
    }
  }
  strainTypes {
    nodes {
      name
      slug
    }
  }
  details: strainDetails {
    cannabinoids {
      abbreviation
      quantityStart
      quantityEnd
    }
    thc {
      quantityStart
      quantityEnd
    }
  }
}

query SearchStrainByString(
    $languageCode: LanguageCodeFilterEnum = DEFAULT
    $search: String = ""
    $after: String = null
    $limit: Int = 12
    $imageSize: MediaItemSizeEnum = LARGE
  ) {
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
```

Code for strains single page/template:

```
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

query SingleStrain($slug: ID! = "", $imageSize: MediaItemSizeEnum = _2048X2048) {
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
```
