import React from "react";
import { graphql, compose } from "react-apollo";
import {
  ArticleBySlugQuery,
  ArticleByIDQuery,
  AllSectionsQuery
} from "../queries";
import ArticleForm from "./ArticleForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { withRouter } from "react-router-dom";
import { UpdateArticle } from "../mutations";
import Loading from "./Loading";
import injectSheet from "react-jss";

const styles = {
  error: {
    color: "red",
    display: "flex",
    fontSize: "1.1em",
    lineHeight: "1.3em",
    alignItems: "center",
    flexDirection: "column"
  }
};
const EditArticlePage = ({
  mutate,
  article,
  sections,
  push,
}) => {
  const handleSubmit = values => {
    const contributors = values.contributors.map(
      contributor => contributor.value
    );
    // Actually have to convert to a real int cause GraphQL...
    mutate({
      variables: {
        ...values,
        section_id: parseInt(values.section.id),
        id: article.articleBySlug.id,
        contributors
      },
      refetchQueries: [
        {
          query: ArticleByIDQuery,
          variables: { id: article.articleBySlug.id }
        }
      ]
    })
      .then(() => {
        push("/articles");
      })
      .catch(err => {
        console.error(err);
      });
  };
  if (sections.loading || article.loading) {
    return <Loading />;
  }
  const contributors = article.articleBySlug.contributors.map(user => ({
    value: parseInt(user.id),
    label: user.email
  }));

  const articleWithContributors = {
    ...article.articleBySlug,
    contributors
  };
  return (
    <ArticleForm
      initialValues={articleWithContributors}
      onSubmit={handleSubmit}
      sections={sections.allSections}
    />
  );
};
const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);

export default compose(
  withRouter,
  graphql(ArticleBySlugQuery, {
    options: ({ match }) => ({ variables: { slug: match.params.slug } }),
    name: "article"
  }),
  graphql(AllSectionsQuery, {
    name: "sections"
  }),
  connect(null, mapDispatchToProps),
  graphql(UpdateArticle),
  injectSheet(styles)
)(EditArticlePage);
