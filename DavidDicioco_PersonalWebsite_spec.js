describe('Main Page -> Lefthand Side', () => {
	it('Verify Profile Image, Name, and Titles are correct', () => {
		cy.visit('https://david-dicioco.github.io/')

		cy.contains('David Dicioco')
		cy.contains('Quality Assurance Engineer')
		cy.contains('Software Developer')
	})

	it('Verify Links to LinkedIn and Github are correct', () => {
		//Make sure links to LinkedIn and Github are working correctly
		cy.get('.fa-linkedin').focus()
		cy.get('.fa-linkedin').should('have.attr','href','https://www.linkedin.com/in/david-dicioco-904a0724/')

		cy.get('.fa-github').focus()
		cy.get('.fa-github').should('have.attr','href','https://github.com/david-dicioco')

	})
})

describe('Main Page -> About Me', () => {
	it('Verify "About Me" is available', () => {
		cy.contains('About Me').click()
	})

	it('Verify Resume is the latest version', () => {
		cy.get('.resume').should('have.attr','href','resume/Resume-David-Dicioco.docx')
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
		cy.contains('Automated test cases verify this website and personal projects are stable, functional, and have the correct and latest information.')
		cy.contains("Enter any city from the world and see it's forecast.")
	})

	it('Verify all Personal Projects contain the correct Github links', () => {
		cy.get('a[href="https://github.com/david-dicioco/PersonalWebsite_TestAutomation_Cypress"]')
		cy.get('a[href="https://github.com/david-dicioco/WeatherApp"]')
	})
})

describe('Main Page -> Get In Touch', () => {
	it('Verify "Get In Touch" is available', () => {
		cy.contains('Get In Touch').click()
	})

	it('Verify Mobile Phone Number is correct', () => {
		cy.get('.mobile-phone-number').contains('647-629-2991')
	})

	it('Verify Email Address is correct', () => {
		cy.get('.email-address').contains('david.dicioco@gmail.com')
		cy.get('.email-address').should('have.attr','href','mailto:david.dicioco@gmail.com')
	})
})

describe('Personal Projects -> Weather Application', () => {
	it('Verify access to Weather Application', () => {
		cy.get('.weather-app').should('have.attr','href','projects\\WeatherApp\\index.html').click()
	})

	it('Functional Test - Enter a city and click "Search" button', () => {
		cy.get('input[id="city"]').type('toronto')
		cy.get('input[value="Search"]').click()

	})

	it('Functional Test - Clear out text field, enter a new city, and click "Search" button', () => {
		cy.get('input[id="city"]').clear()
		
		cy.get('input[id="city"]').type('tokyo')
		cy.get('input[value="Search"]').click()

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
		cy.get('input[id="city"]').type('!@#$%')
		cy.get('input[value="Search"]').click()
		
		cy.on('window:alert', (str) =>
			{
				expect(str).to.equal('Invalid characters')
			}
		)
	})

	it('Error Test - Enter numbers to text field and click "Search" button', () => {
		cy.get('input[id="city"]').clear()
		cy.get('input[id="city"]').type('123123')
		cy.get('input[value="Search"]').click()

		cy.on('window:alert', (str) =>
			{
				expect(str).to.equal('Invalid characters')
			}
		)
	})

	it('Error Test - Enter combination of symbols, numbers, and text to text field and click "Search" button', () => {
		cy.get('input[id="city"]').clear()
		cy.get('input[id="city"]').type('!@#!#@123123asdasdASDASD')
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
})

