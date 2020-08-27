const timeout = 15000;

// test d'un raccourcisseur d'URL
describe("Login", () => {
    let page;

    // vérification du login basique
    test('basic login', async () => {
        await page.goto('http://polr.stationmyr.net/');
        await page.waitForSelector('.dropdown-toggle');
        await page.click('.dropdown-toggle');
        await page.screenshot({path: './tests/img/login/signinmenu.png'});
        await page.waitForSelector('.dropdown-menu form [name=username]');
        await page.type('.dropdown-menu form [name=username]', 'jonathanmrn');
        await page.screenshot({path: './tests/img/login/usernamelogin.png'});
        await page.waitForSelector('.dropdown-menu form [name=password]');
        await page.type('.dropdown-menu form [name=password]', 'jonathan');
        await page.screenshot({path: './tests/img/login/passwordlogin.png'});
        await page.waitForSelector('.dropdown-menu form [name=login]');
        await page.click('.dropdown-menu form [name=login]');
        await page.screenshot({path: './tests/img/login/successbasiclogin.png'});

    }, timeout);

    // déconnexion du login basique
    test('basic logout', async () => {
        await page.goto('http://polr.stationmyr.net/');
        await page.waitForSelector('.dropdown-toggle');
        await page.click('.dropdown-toggle');
        await page.screenshot({path: './tests/img/logout/logoutmenu.png'});
        // click sur le lien "logout" de la navigation
        await page.evaluate( () => {
            Array
                .from(document.querySelectorAll('.dropdown-menu li a'))
                .filter(el => el.textContent === 'Logout')[0].click();
        });
        await page.waitForSelector('body');
        await page.screenshot({path: './tests/img/logout/logout.png'});



    }, timeout);
    // vérification du login admin
    test('admin login', async () => {
        await page.goto('http://polr.stationmyr.net/');
        await page.waitForSelector('.dropdown-toggle');
        await page.click('.dropdown-toggle');
        await page.screenshot({path: './tests/img/login/signinmenu.png'});
        await page.waitForSelector('.dropdown-menu form [name=username]');
        await page.type('.dropdown-menu form [name=username]', 'admin');
        await page.screenshot({path: './tests/img/login/adminlogin.png'});
        await page.waitForSelector('.dropdown-menu form [name=password]');
        await page.type('.dropdown-menu form [name=password]', 'campus');
        await page.screenshot({path: './tests/img/login/passwordadminlogin.png'});
        await page.waitForSelector('.dropdown-menu form [name=login]');
        await page.click('.dropdown-menu form [name=login]');
        await page.screenshot({path: './tests/img/login/successadminlogin.png'});

    }, timeout);



    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
