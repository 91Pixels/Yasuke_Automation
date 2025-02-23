Feature: UI Button Color Testing

  Scenario: Validate Login button color
    Given I open the browser
    When I navigate to "https://panic-alert-stage.azurewebsites.net/login"
    Then the button "/html/body/app-root/app-login/div/div[2]/div[2]/div[1]/form/div[3]/input" should have the color "#009bb6"
