import { gql } from 'apollo-client-preset'

export const SectionQuery = gql`
  query SectionQuery($slug: String!) {
    sectionBySlug(slug: $slug) {
      id
      name
      subsections {
        id
        name
        slug
      }
      articles {
        id
        summary
        content
        slug
        title
      }
      parent_section {
        slug
      }
    }
  }
`;

export const SectionsQuery = gql`
  query SectionsQuery {
    topLevelSections {
      id
      name
      slug
    }
  }
`;

export const ArticlesQuery = gql`
  query ArticlesQuery {
    allArticles {
      id
      summary
      content
      slug
      title
      section {
        id
        name
      }
    }
  }
`;

export const ArticleBySlugQuery = gql`
query ArticleBySlugQuery($slug: String!) {
  articleBySlug(slug: $slug) {
    id
    title
    contributors {
      id
      email
      first_name
      last_name
    }
    slug
    section {
      id
    }
    summary
    content
  }
}
`

export const ArticleByIDQuery = gql`
query ArticleByIDQuery($id: ID!) {
  articleByID(id: $id) {
    id
    title
    slug
    contributors {
      id
      email
      first_name
      last_name
    }
    section {
      id
    }
    summary
    content
  }
}
`
export const SearchArticlesQuery = gql`
query SearchArticlesQuery($query: String!) {
  searchArticles(query: $query) {
    searchable {
      id
      summary
      content
      slug
      title
      section {
        id
        name
      }
    }
  }
}
`

export const UsersQuery = gql`
query UsersQuery {
  allUsers {
    id
    email
  }
}
`
