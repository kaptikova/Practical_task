
        import { test, expect, type Page } from '@playwright/test';


        test.beforeEach(async ({ page }) => {
            await page.goto('https://a_11bnid1xu2x.v7.demo.nocobase.com/signin?redirect=');
            await page.getByPlaceholder('Username/Email').fill("admin@nocobase.com");
            await page.getByPlaceholder("Password").fill("admin123");

            //await page.getByRole('button',{ name: 'Sign in'}).click();
            page.locator("[type='submit']").click();
            //new Promise(r => setTimeout(r, 2000));

            //Cehck that the User moved to Admin page
            await expect(page).toHaveURL("https://a_11bnid1xu2x.v7.demo.nocobase.com/admin/qr6akbz4dxy");
            //Check that the User can move to Companies page
            await page.locator("[aria-label='Users']").click();
            // await expect(page).toHaveURL("https://a_11bnid1xu2x.v7.demo.nocobase.com/admin/6xd1ti4a85d");  
            await expect(page).toHaveTitle("Companies - NocoBase");                  

            //Check that the User can move to Customer sub-page
            await page.locator("[data-node-key='eauxu34kuux']").click();
            await expect(page).toHaveURL("https://a_11bnid1xu2x.v7.demo.nocobase.com/admin/6xd1ti4a85d?tab=eauxu34kuux"); 
            await new Promise(r => setTimeout(r, 1000));

        });



        test.describe('Check that the User can find all elements on the page', () => {
            test('Check that table with Customer info cintain all (5) expected columns  ', async ({ page }) => {

            await expect (page.locator('[aria-label="Select all"]')).toBeVisible();
            await new Promise(r => setTimeout(r, 1000)); 

            const buttons = page.getByText('Actions', { exact: true });
            await expect(buttons).toBeVisible();
            console.log('buttons: ', buttons);

            await expect (page.getByText('Name', { exact: true })).toBeVisible();
            await expect (page.getByText('Industry', { exact: true })).toBeVisible();
            await expect (page.getByText('Employees', { exact: true })).toBeVisible();
            await expect (page.getByText('Created at', { exact: true })).toBeVisible();

        });   

        test('Cehck that the User can work with filter on the Customer sub-page', async ({ page }) => {
            const filterButton = page.getByText('Filter', { exact: true })
            await expect(filterButton).toBeVisible();
            await filterButton.click();

            //Chechk that tooltip is opened
            await expect(page.locator("[role='tooltip']")).toBeVisible();

            //Check that the User can close tooltip
            const resetButton = page.getByText('Reset', { exact: true })
            await expect(resetButton).toBeVisible();
            await resetButton.click();

            //Check that the User can Open tooltip again
            const filterButton2 = page.getByText('Filter', { exact: true })
            //await expect(filterButton2).toBeVisible();
            await filterButton2.click();

            //Check that the User can set "Any" for filter
            await page.getByTestId('filter-select-all-or-any').click();
            //await new Promise(r => setTimeout(r, 1000)); 
            await page.getByText('Any').hover();
            await page.getByText('Any').click();

            //Check that the User can set "Created on" for filter 
            await page.getByTestId("select-filter-field").click();
            await page.locator("[title='Created at']").click();

            //Check that the User can set "is" for filter 
            await page.getByTestId("select-filter-operator").click();
            await page.getByRole('option', { name: 'is', exact: true }).click();

            //Check that the User can set data for filter 
            const dateInput = page.getByPlaceholder("Select date");
            await dateInput.click();
            await dateInput.fill("2024-02-21");
            await page.keyboard.press("Enter"); 

            //Press on Submit button
            await page.getByText('Submit').click();

            //Check that filter is working 
            //and we found that something wrong with match data and filter options, becouse we can't find records on site
            await expect (page.locator(".ant-description-date-picker")).toHaveCount(2);

        });

        test('Cehck that the User can work with different filter optiond on the sub-page', async ({ page }) => {
            const filterButton3 = page.getByText('Filter', { exact: true })
            await expect(filterButton3).toBeVisible();
            await filterButton3.click();

            //Chechk that tooltip is opened
            await expect(page.locator("[role='tooltip']")).toBeVisible();


            //Check that the User can set "Created on" for filter 
            await page.getByTestId("select-filter-field").click();
            await page.locator("[title='Created at']").click();

            //Check that the User can set "is" for filter 
            await page.getByTestId("select-filter-operator").click();
            await page.getByRole('option', { name: 'is on or after', exact: true }).click();
        
            //Check that the User can set data for filter 
            const dateInput = page.getByPlaceholder("Select date");
            await dateInput.click();
            await dateInput.fill("2024-02-21");
            await page.keyboard.press("Enter"); 

            //Press on Submit button
            await page.getByText('Submit').click();

            //Check that filter is working 
            await expect (page.locator(".ant-description-date-picker")).toHaveCount(2);

        });


        test('Cehck that the User can work with filter optiond by name', async ({ page }) => {
            const filterButton3 = page.getByText('Filter', { exact: true })
            await expect(filterButton3).toBeVisible();
            await filterButton3.click();

            //Chechk that tooltip is opened
            await expect(page.locator("[role='tooltip']")).toBeVisible();

                
            //Check that the User can set "Name" for filter 
            await page.getByTestId("select-filter-field").click();
            await page.locator("[role='menuitemcheckbox'][title='Name']").click();

            //Check that the User can set "contain" for filter 
            await page.getByTestId("select-filter-operator").click();
            await page.getByRole('option', { name: 'contains', exact: true }).click();

            //Check that the User can select name "Praxis Corporation"
            const nameInput2 = page.locator(".ant-input.css-19t1yef");
            await nameInput2.fill("Praxis Corporation");
            
            //Press on Submit button
            await page.locator("[type='submit']").click();

            //Check that filter is working 
            await expect (page.locator(".ant-description-date-picker")).toHaveCount(1);

        });

    });
