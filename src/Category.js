import React from "react";
import { Link } from "react-router-dom";

const Category = ({ category, currentCategory, onCategoryClick, store }) => {
  // If on currently selected category, return span instead of link
  if (category.name === currentCategory) {
    return (
      <li className="category-item">
        <span>{category.name}</span>
      </li>
    );
  }

  // Make 'all' link to home, otherwise use category path
  const slug = category.name === "all" ? "/" : `/r/${category.path}`;

  // All category names link to their 'slug'
  return (
    <li className="category-item">
      <Link
        to={slug}
        style={{ textDecoration: "none" }}
      >
        {category.name}
      </Link>
    </li>
  );
};

export default Category;
