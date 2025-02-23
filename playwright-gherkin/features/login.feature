Feature: Login Functionality Tests

  Scenario: Verify login page title
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/login"
    Then The page title should contain "Panic Alert"

  Scenario: Test invalid login
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/login"
    And I enter "wrong@email.com" in the email field
    And I enter "invalidpassword" in the password field
    And I click the login button
    Then I should see error message "Unable to access Social Alert. Please contact the Administrator or try again later."

  Scenario: Test successful login
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/login"
    And I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard