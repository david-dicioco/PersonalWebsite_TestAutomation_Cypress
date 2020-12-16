describe('Main Page -> Lefthand Side', () => {
	it('Verify Profile Image, Name, and Titles are correct', () => {
		
		cy.fixture('personal_website_data').then((personal_website_data)  => {
			cy.visit(personal_website_data.url)
			cy.contains(personal_website_data.name)
			cy.contains(personal_website_data.title1)
			cy.contains(personal_website_data.title2)
		})
	})

	it('Verify Links to LinkedIn and Github are correct', () => {
		//Make sure links to LinkedIn and Github are working correctly
		cy.fixture('personal_website_data').then((personal_website_data)  => {
			cy.get('.fa-linkedin').focus()
			cy.get('.fa-linkedin').should('have.attr','href',personal_website_data.linkedin)
	
			cy.get('.fa-github').focus()
			cy.get('.fa-github').should('have.attr','href',personal_website_data.github)
		})
	})
})

describe('Main Page -> About Me', () => {
	it('Verify "About Me" is available', () => {
		cy.contains('About Me').click()
	})
	
		it('Verify Resume is the latest version', () => {
			cy.fixture('personal_website_data').then((personal_website_data)  => {
				cy.get('.resume').should('have.attr','id',personal_website_data.resumeDate)
			})
		})
	
})

describe('Main Page -> Personal Projects', () => {
	it('Verify "Personal Projects" is available', () => {
		
	cy.contains('Personal Projects').click()
	})

	it('Verify all Personal Projects images loaded correctly', () => {
		cy.get('img[src]')
		.should('be.visible')
		.and(($img) => {
		  // "naturalWidth" and "naturalHeight" are set when the image loads
		  expect($img[0].naturalWidth).to.be.greaterThan(0)
		})
	})

	it('Verify all Personal Projects contain the correct descriptions', () => {
		cy.fixture('personal_website_data').then((personal_website_data)  => {
			cy.contains(personal_website_data.personalProject_CypressAutomation_Description)
			cy.contains(personal_website_data.personalProject_StockTrackerAutomation_Description)
			cy.contains(personal_website_data.personalProject_WeatherApp_Description)
		})
	})

	it('Verify all Personal Projects contain the correct Github links', () => {
		cy.fixture('personal_website_data').then((personal_website_data)  => {
			cy.get('a[href="'+personal_website_data.personalProject_CypressAutomation_GithubLink+'"]')
			cy.get('a[href="'+personal_website_data.personalProject_StockTrackerAutomation_GithubLink+'"]')
			cy.get('a[href="'+personal_website_data.personalProject_WeatherApp_GithubLink+'"]')
		})
	})
})

describe('Main Page -> Get In Touch', () => {
	it('Verify "Get In Touch" is available', () => {
		cy.fixture('personal_website_data').then((personal_website_data)  => {
			cy.contains(personal_website_data.getInTouchTitle).click()
		})
	})

	it('Verify Mobile Phone Number is correct', () => {
		cy.fixture('personal_website_data').then((personal_website_data)  => {
			cy.get('.mobile-phone-number').contains(personal_website_data.mobilePhoneNumber)
		})
	})

	it('Verify Email Address is correct', () => {
		cy.fixture('personal_website_data').then((personal_website_data)  => {
			cy.get('.email-address').contains(personal_website_data.email)
			cy.get('.email-address').should('have.attr','href','mailto:'+personal_website_data.email)
		})
	})
})

describe('Personal Projects -> Weather Application', () => {
	it('Verify access to Weather Application', () => {
		cy.get('.weather-app').should('have.attr','href','projects\\WeatherApp\\index.html').click()
	})

	it('Functional Test - Enter a city and click "Search" button', () => {
		cy.fixture('personal_website_data').then((personal_website_data)  => {
			cy.get('input[id="city"]').type(personal_website_data.personalProject_WeatherApp_City1)
			cy.get('input[value="Search"]').click()
		})
	})

	it('Functional Test - Clear out text field, enter a new city, and click "Search" button', () => {
		cy.get('input[id="city"]').clear()
		
		cy.fixture('personal_website_data').then((personal_website_data)  => {
			cy.get('input[id="city"]').type(personal_website_data.personalProject_WeatherApp_City2)
			cy.get('input[value="Search"]').click()
		})
	})


	it('Functional Test - Verify Forecast Images have loaded', () => {

		// we can wait for the <img> element to appear
		// but the image has not been loaded yet.
		cy.get('img[src]')
		.should('be.visible')
		.and(($img) => {
		  // "naturalWidth" and "naturalHeight" are set when the image loads
		  expect($img[0].naturalWidth).to.be.greaterThan(0)
		})

	})

	it('Functional Test - Click "Change To Fahrenheit" button and ensure °F changed to °C', () => {
		
		cy.get('p[id="currenttempurature"]').should(($div) => {
			  const text = $div.text()

			  expect(text).to.include('°C')
			  //expect(text).to.match(/foo/)
			  //expect(text).not.to.include('bar')

		})
		
		cy.get('input[value="Change To Fahrenheit"]').click()

		cy.get('p[id="currenttempurature"]').should(($div) => {
			  const text = $div.text()

			  expect(text).to.include('°F')

		})	
	})

	it('Functional Test - Click "Change To Celsius" button and ensure °C changed to °F', () => {
		
		cy.get('p[id="currenttempurature"]').should(($div) => {
			
			  const text = $div.text()
			  
			  expect(text).to.include('°F')

		})
		
		cy.get('input[value="Change To Celsius"]').click()

		cy.get('p[id="currenttempurature"]').should(($div) => {
			  const text = $div.text()
			  
			  expect(text).to.include('°C')

		})	
	})

	it('Error Test - Enter nothing to text field and click "Search" button', () => {
		cy.reload()
		
		cy.get('input[id="city"]').clear()
		cy.get('input[value="Search"]').click()
		
		cy.on('window:alert', (str) =>
			{
				expect(str).to.equal('Enter a city')
			}
		)
	})

	it('Error Test - Enter symbols to text field and click "Search" button', () => {
		cy.get('input[id="city"]').clear()
		cy.fixture('personal_website_data').then((personal_website_data)  => {
			cy.get('input[id="city"]').type("'"+personal_website_data.personalProject_WeatherApp_SymbolsInput+"'")
		})
		cy.get('input[value="Search"]').click()
		
		cy.on('window:alert', (str) =>
			{
				expect(str).to.equal('Invalid characters')
			}
		)
	})

	it('Error Test - Enter numbers to text field and click "Search" button', () => {
		cy.get('input[id="city"]').clear()
		cy.fixture('personal_website_data').then((personal_website_data)  => {
			cy.get('input[id="city"]').type("'"+personal_website_data.personalProject_WeatherApp_NumbersInput+"'")
		})
		cy.get('input[value="Search"]').click()

		cy.on('window:alert', (str) =>
			{
				expect(str).to.equal('Invalid characters')
			}
		)
	})

	it('Error Test - Enter combination of symbols, numbers, and text to text field and click "Search" button', () => {
		cy.get('input[id="city"]').clear()
		cy.fixture('personal_website_data').then((personal_website_data)  => {
			cy.get('input[id="city"]').type("'"+personal_website_data.personalProject_WeatherApp_CombinationInput+"'")
		})
		cy.get('input[value="Search"]').click()

		cy.on('window:alert', (str) =>
			{
				expect(str).to.equal('Invalid characters')
			}
		)
	})
})

describe('Navigation Tests', () => {
	it('Navigate back to Main Page', () => {
		cy.go('back')
		cy.scrollTo('top')
	})
	
	it('Verify href attributes for Personal Projects are correct', () => {
		cy.fixture('personal_website_data').then((personal_website_data)  => {
			cy.get('.personalwebsite-demo').should('have.attr','href',personal_website_data.personalProject_cypressAutomation_href)
			cy.get('.stock-tracker-consoles-demo').should('have.attr','href',personal_website_data.personalProject_StockTrackerAutomation_href)
			cy.get('.weather-app').should('have.attr','href',personal_website_data.personalProject_WeatherApp_href)	
		})	
	})
})


