# Requirements Document

## Introduction

This document specifies requirements for enhancing the domain routing logic in the EdDesk proxy. The enhancement changes how owner domains are identified (from exact match to contains check) and clarifies how template slugs are passed for demo templates versus customer tenants.

## Glossary

- **proxy**: The Next.js Edge proxy component that intercepts HTTP requests and performs domain-based routing
- **Owner_Domain**: A domain that belongs to the EdDesk platform itself (localhost or eddesk.in)
- **Tenant_Domain**: A domain that belongs to a customer school
- **Marketing_Page**: The main EdDesk marketing website shown to visitors on owner domains
- **Template_Slug**: An identifier for a school website template (e.g., "template_classic", "template_modern")
- **School_Array**: The domain_data array in constants.js containing domain configurations
- **Demo_Template**: A template accessed via /demo/* routes for demonstration purposes
- **Customer_Tenant**: A production tenant domain used by an actual customer school

## Requirements

### Requirement 1: Owner Domain Identification

**User Story:** As a platform administrator, I want owner domains to be identified using a contains check, so that any domain containing "localhost" or "eddesk" is recognized as an owner domain regardless of port or subdomain.

#### Acceptance Criteria

1. WHEN a request hostname contains "localhost", THE proxy SHALL identify it as an Owner_Domain
2. WHEN a request hostname contains "eddesk", THE proxy SHALL identify it as an Owner_Domain
3. WHEN a request hostname does not contain "localhost" or "eddesk", THE proxy SHALL identify it as a Tenant_Domain
4. THE proxy SHALL perform case-insensitive matching when checking if hostname contains "localhost" or "eddesk"

### Requirement 2: Owner Domain Routing

**User Story:** As a visitor, I want to see the marketing page when I access an owner domain, so that I can learn about the EdDesk platform.

#### Acceptance Criteria

1. WHEN a request is from an Owner_Domain, THE proxy SHALL allow the request to proceed to the Marketing_Page
2. WHEN a request is from an Owner_Domain and the path starts with "/demo", THE proxy SHALL allow the request to proceed to the demo route

### Requirement 3: Tenant Domain Routing

**User Story:** As a school administrator, I want my school's domain to route to the correct template, so that visitors see my school's website.

#### Acceptance Criteria

1. WHEN a request is from a Tenant_Domain, THE proxy SHALL look up the domain configuration in the School_Array
2. WHEN a domain configuration is found in the School_Array, THE proxy SHALL rewrite the request to /tenant/[...path] with the template_id from the configuration
3. WHEN a domain configuration is not found in the School_Array, THE proxy SHALL return an error response

### Requirement 4: Demo Template Slug Handling

**User Story:** As a developer, I want demo templates to receive the template slug parameter, so that the demo system knows which template to display.

#### Acceptance Criteria

1. WHEN a request path starts with "/demo" and is from an Owner_Domain, THE proxy SHALL pass the Template_Slug parameter to the demo route
2. THE proxy SHALL extract the Template_Slug from the request path or query parameters for demo routes
3. WHEN no Template_Slug is specified in a demo request, THE proxy SHALL return an error response

### Requirement 5: Customer Tenant Slug Handling

**User Story:** As a system architect, I want customer tenant routes to receive null for the template slug parameter, so that the tenant system loads the template from the database configuration.

#### Acceptance Criteria

1. WHEN a request is rewritten to /tenant/[...path] for a Customer_Tenant, THE proxy SHALL pass null as the Template_Slug parameter
2. THE proxy SHALL distinguish between Demo_Template requests and Customer_Tenant requests based on the request path
3. WHEN a request path does not start with "/demo" and is from a Tenant_Domain, THE proxy SHALL treat it as a Customer_Tenant request

### Requirement 6: Demo Route Access Control

**User Story:** As a security administrator, I want demo routes to be accessible only from owner domains, so that demo templates are not exposed on customer domains.

#### Acceptance Criteria

1. WHEN a request path starts with "/demo" and is from a Tenant_Domain, THE proxy SHALL return a 404 Not Found response
2. WHEN a request path starts with "/demo" and is from an Owner_Domain, THE proxy SHALL allow the request to proceed
3. THE proxy SHALL log blocked demo access attempts from Tenant_Domains

### Requirement 7: School Array Lookup

**User Story:** As a developer, I want the proxy to use the school array for domain lookups, so that routing decisions are based on the centralized domain configuration.

#### Acceptance Criteria

1. THE proxy SHALL read domain configurations from the School_Array (domain_data in constants.js)
2. WHEN looking up a domain, THE proxy SHALL match against the "domain" field in the School_Array
3. WHEN a match is found, THE proxy SHALL use the "template_id" field for routing decisions
4. THE proxy SHALL support both exact domain matching and hostname matching (without www prefix)
