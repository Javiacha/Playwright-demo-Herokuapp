@login @smoke @regression
Feature: Login functionality
  As a registered user
  I want to log in to the secure area
  So that I can access protected content

  Background:
    Given I am on the login page

  @smoke
  Scenario: Successful login with valid credentials
    When I log in with username "tomsmith" and password "SuperSecretPassword!"
    Then I should see a success message
    And the logout button should be visible

  @regression
  Scenario: Failed login with invalid username
    When I log in with username "invaliduser" and password "SuperSecretPassword!"
    Then I should see an error message

  @regression
  Scenario: Failed login with invalid password
    When I log in with username "tomsmith" and password "wrongpassword"
    Then I should see an error message

  @regression
  Scenario: Successful logout after login
    When I log in with username "tomsmith" and password "SuperSecretPassword!"
    And I click the logout button
    Then I should be logged out successfully
