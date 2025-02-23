Feature: UI Button Color Testing

  Scenario: Validate Login button color
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/login"
    Then the button "/html/body/app-root/app-login/div/div[2]/div[2]/div[1]/form/div[3]/input" should have the color "#009bb6"

    Scenario: Validate Send Email button color
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/forgotPassword"
    Then the button "[title='Send Email']" should have the color "#009bb6"

    Scenario: Validate Create Account button color
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/register"
    Then I check the "#agree" checkbox
    Then the button "[title='Create Account']" should have the color "#009bb6"

    Scenario: Validate Location button color
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/login"
    And I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard
    Then the button "[title='View on Map']" should have the color "#009bb6"

    Scenario: Validate Clear button color
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/login"
    And I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard
    Then I click the "[title='Filters']" button
    Then the button "[title='Clear']" should have the color "#c12127"

    Scenario: Validate Apply button color
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/login"
    And I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard
    Then I click the "[title='Filters']" button
    Then the button "[title='Apply']" should have the color "#009bb6"

    Scenario: Validate Export button color
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/login"
    And I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard
    Then I click the "[title='Alert History']" button
    Then the button "[title='Export']" should have the color "#009bb6"

    Scenario: Validate Clear Filter button color
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/login"
    And I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard
    Then I click the "[title='Alert History']" button
    Then the button ".remove-filter-btn" should have the color "#c12127"

    Scenario: Validate Apply Filter button color
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/login"
    And I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard
    Then I click the "[title='Alert History']" button
    Then the button ".apply-filter-btn" should have the color "#0352ac"

    Scenario: Validate  Add Notification button color
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/login"
    And I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard
    Then I click the "[title='Notifications']" button
    Then the button "[title='Add Notification']" should have the color "#009bb6"

    Scenario: Validate  Add User button color
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/login"
    And I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard
    Then I click the "[title='Users']" button
    Then the button "[title='Add User']" should have the color "#009bb6"