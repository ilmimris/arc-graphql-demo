const fs = require("fs");
const path = require("path");

/*
 * Check for GRAPHQL_SCHEMA environment variable to specify schema file
 * fallback to schema.graphql if GRAPHQL_SCHEMA environment variable is not set
 */
const typeDefs = fs
        .readFileSync( path.join(__dirname, "schema.graphql") )
        .toString("utf-8");

module.exports = typeDefs