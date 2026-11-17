---
author: ReasonOps System
created: '2025-05-16T10:33:34.924Z'
links: []
status: stub
tags:
  - reasonops
  - obsidian
  - enterprise
title: table-actions
type: doc
updated: '2025-05-16T10:33:34.924Z'
visibility: public
---
# Table Actions

## Overview
This document describes the Table Actions feature in SAP/Palantir Enterprise. The aim of this feature is to provide a simple, user-friendly way for users to perform actions on tables within applications like SAP/Palantir without having direct access to code.

## User Stories
1. As an application developer, I want to define table actions so that my end users can easily interact with the data in my application.
2. As a system administrator, I need to ensure that table actions are enabled and configured correctly to maintain data integrity and security.
3. As a user, I should be able to see which table actions are available for me based on my role and privileges.
4. As an end-user, I want to know what changes will occur when I perform certain table actions so that I can make informed decisions.
5. As an application developer, I need the ability to disable or hide table actions from users without affecting system functionality.
6. As a user, I expect errors and failures to be handled gracefully for all table actions performed by my role.
7. As an end-user, I want to see what actions were performed on the data in case of any issue with system downtime or failure.
8. As a system administrator, I should receive notifications when a significant number of users are performing certain actions.
9. As an application developer, I need to be able to define table actions that trigger batch jobs and schedule them as per my requirements.
10. As a user, I want to have the ability to hide certain columns from appearing in the table action dialog box for security reasons.

## Technical Context
The Table Actions feature uses a client-side framework (like AngularJS) that provides a UI abstraction on top of SAP/Palantir's server-side services. The frontend communicates with backend using REST APIs and the data returned by these APIs is used to populate the user interface elements in real time.

## Related Links
1. [SAP/Palantir Documentation](https://help.palantir.com/)
2. [Table Actions on GitHub](https://github.com/sap/table-actions)
3. [Feature Request for Table Actions in SAP Community](https://scn.sap.com/community/cloud-applications/analytics/blog/2016/07/04/introducing-the-table-actions-feature-in-sap-hana-studio)

## Tags
#SAP #Palantir #TableActions #Feature #UserStory #TechnicalContext #Documentation
