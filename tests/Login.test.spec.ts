
        import { test, expect, type Page } from '@playwright/test';
       


        test.beforeEach(async ({ page }) => {
            //Go to Login page and fill required fields for login
            await page.goto('https://a_qyqqd2gpgns.v7.demo.nocobase.com/signin?redirect=');
            await page.getByPlaceholder('Username/Email').fill("admin@nocobase.com");
            await page.getByPlaceholder("Password").fill("admin123");

            //Ckick Sign in button
            //await page.getByRole('button',{ name: 'Sign in'}).click();
            page.locator("[type='submit']").click();
            //new Promise(r => setTimeout(r, 2000));

            //Cehck that the User moved to Admin page
            await expect(page).toHaveURL("https://a_qyqqd2gpgns.v7.demo.nocobase.com/admin");
            //Check that the User can move to Companies page
            await page.locator("[aria-label='Users']").click();
            // await expect(page).toHaveURL("https://a_11bnid1xu2x.v7.demo.nocobase.com/admin/6xd1ti4a85d");  
            await expect(page).toHaveTitle("Companies - NocoBase");                  

            //Check that the User can move to Customer tab
            await page.locator("[data-node-key='eauxu34kuux']").click();
            await expect(page).toHaveURL("https://a_qyqqd2gpgns.v7.demo.nocobase.com/admin/6xd1ti4a85d?tab=eauxu34kuux"); 
            await new Promise(r => setTimeout(r, 1000));

        });



        test.describe('Check that the User can find all elements on the page', () => {
            test('Check that table with Customer info cintain all (5) expected columns  ', async ({ page }) => {

            //Check that Customer tab contain 6 columns (Select all, Action, Name, Industry, Employees, Created at)
            await expect (page.locator('[aria-label="Select all"]')).toBeVisible();
            //await new Promise(r => setTimeout(r, 1000)); 

            const buttons = page.getByText('Actions', { exact: true });
            await expect(buttons).toBeVisible();
            console.log('buttons: ', buttons);
            await expect (page.getByText('Name', { exact: true })).toBeVisible();
            await expect (page.getByText('Industry', { exact: true })).toBeVisible();
            await expect (page.getByText('Employees', { exact: true })).toBeVisible();
            await expect (page.getByText('Created at', { exact: true })).toBeVisible();

        });   

        test('Cehck that the User can work with filter on the Customer tab', async ({ page }) => {
            //Check that tab contain Filter button
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

        test('Cehck that the User can work with different filter optiond on the tab', async ({ page }) => {
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


        test('Cehck that the User can set filter by name', async ({ page }) => {
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

        test('Cehck that the User can open any record in view mode', async ({ page }) => {
            //select any record in tab, for example "Judith May, Robinetworks"
            await page.getByLabel('action-Action.Link-View-view-company-table-Judith May, Robinetworks').click();

            //make sure that new area with info about company is opened
            await page.locator('.ant-drawer-body').isVisible();

            //Check that opened area has expected tabs: Details, Notes, Interactions, Others, Contacts
            await expect (page.getByText('Details', { exact: true })).toBeVisible();
            await expect (page.getByText('Notes', { exact: true })).toBeVisible();
            await expect (page.getByRole('tab', { name: 'Orders' }).locator('div')).toBeVisible();
            await expect (page.getByRole('tab', { name: 'Contacts' }).locator('div')).toBeVisible();

            //Check that the USer can move to tab Notes and Add records here
            await page.getByText("Notes", { exact: true }).click();

            //Check number of records until a new one is added
            await expect(page.locator(".ant-description-textarea p")).toHaveCount(10);
            
            //Check that the User can add new record on Notes tab by button "+ Add new"
            await page.locator("[aria-label='action-Action-Add new-create-note-list-3']").click();

            //Add content:
            const contantField = page.locator(".ql-editor");
            await contantField.click();

            const newData = Math.random().toString();
            await page.keyboard.type(newData);

            //Press Submit button
            await page.locator("[aria-label='action-Action-Submit-submit-note-form-3']").click();
            await new Promise(r => setTimeout(r, 1000)); 

            //Check that Notes tab contain added record
            //await expect(page.locator(".itemCss.css-1wpix4y")).toBeVisible();
            await expect(page.locator(".ant-description-textarea p")).toHaveCount(9);
               
            //close opened area
            await page.locator('.ant-drawer-body').isVisible();
            

        });

        test('Cehck that the User can add new record on Customer tab by press "+ Add new" button', async ({ page }) => {
            //Check that Customer tab contain 8 records befor add a new one
            await expect(page.locator(".ant-table-row.ant-table-row-level-0")).toHaveCount(8);

            //Check that the User can add new record by press "+ Add new" button
            await page.locator("[aria-label='action-Action-Add new-create-company-table']").click();

            //Check that the User can add new record after filling just required fields

            //Check that the User can't add new record without filling required fields
            await new Promise(r => setTimeout(r, 1000));
            await page.locator("[aria-label='action-Action-Submit-submit-company-form']").click();

            //Check count required field 
            await new Promise(r => setTimeout(r, 1000));
            await expect (page.locator(".ant-formily-item-error-help.ant-formily-item-help.ant-formily-item-help-enter.ant-formily-item-help-enter-active")).toHaveCount(2);

            //Check that the User can fill "Name" field with data
            await page.locator('[aria-label="block-item-CollectionField-company-form-company.name-Name"] input').fill("Test_Name");

             //Check that requre field "Industry" is working after press bu "Submit" button
            await page.locator("[aria-label='action-Action-Submit-submit-company-form']").click();

            //Check count required field 
            await expect (page.locator(".ant-formily-item-error-help.ant-formily-item-help.ant-formily-item-help-enter.ant-formily-item-help-enter-active")).toHaveCount(1);

            //Check that the User can fill "Industry" field with data
            await page.locator("[aria-label='block-item-CollectionField-company-form-company.industry-Industry'] input").click();
            await page.getByRole('option', { name: 'Retail', exact: true }).click();

           
            //Check that the User can delete data from "Name" field
            await page.locator('[aria-label="block-item-CollectionField-company-form-company.name-Name"] input').clear();

            //Press button "Submit" for sure that requred field "Name" is workin 
            await page.locator("[aria-label='action-Action-Submit-submit-company-form']").click();

            //Check count required field 
            await expect (page.locator(".ant-formily-item-error-help.ant-formily-item-help.ant-formily-item-help-enter.ant-formily-item-help-enter-active")).toHaveCount(1);

            //Check that the User can fill "Name" field with data
            await page.locator('[aria-label="block-item-CollectionField-company-form-company.name-Name"] input').fill("Test_Name");

            //Press button "Submit"
            await page.locator("[aria-label='action-Action-Submit-submit-company-form']").click();

             //Check that Customer tab doesn't contain 9 records after added a new one, because we doesn't fill all fields
             await expect(page.locator(".ant-table-row.ant-table-row-level-0")).toHaveCount(8);

             //Press "+ Add new" button
            await page.locator("[aria-label='action-Action-Add new-create-company-table']").click();

            //Fill "Name" field with data
            await page.locator('[aria-label="block-item-CollectionField-company-form-company.name-Name"] input').fill("Test_Company2");

            //Fill field "Website"
            await page.locator('[aria-label="block-item-CollectionField-company-form-company.website-Website"] input').fill('www.example.com');

             //Ffill "Industry" field with data
             await page.locator("[aria-label='block-item-CollectionField-company-form-company.industry-Industry'] input").click();
             await page.getByRole('option', { name: 'Energy', exact: true }).click();

             //Check that the User can fill "Employee" fields
             await page.getByLabel('block-item-CollectionField-company-form-company.employees-Employees').click();
             await page.getByRole('option', { name: '1,000-5,000', exact: true }).click();

             //Fill field "Location"
             await page.locator('[aria-label="block-item-CollectionField-company-form-company.location-Location"] input').fill('1023 Test St, FL 2516');

             //Check that the User can fill "What do" field
             await page.locator(".ant-checkbox-input[value='internal']").click();

             //Check that the User can add new Contacts for record by "Add new" button
            await page.getByLabel('action-Action-Add new-create-company-form').click();

            //Fill field with contact's name
            await page.locator("[aria-label='block-item-CollectionField-contact-form-contact.name-Name'] input").fill("Andre Malto");

            //Check that the User can select Job Title
            await page.getByLabel('block-item-CollectionField-contact-form-contact.job_title-Job Title').click();
            await page.getByRole('option', { name: 'Manager/Team Leader', exact: true }).click();

            //Save changes and add them by press "Submit" button
            await page.getByLabel('action-Action-Submit-submit-contact-form').click();

            //Check that the User can added related Leads
            await page.locator("[aria-label='block-item-CollectionField-company-form-company.leads-Releated leads'] input").click();
            await new Promise(r => setTimeout(r, 1000));
            await page.getByRole('option', { name: 'Olivia Guzman', exact: true }).click();

            //Press on Submit button on form for added new Customer
            await page.getByLabel('action-Action-Submit-submit-company-form').click();

            //Check that new company added on Customer tab
            await expect(page.locator(".ant-table-row.ant-table-row-level-0")).toHaveCount(8);

            //Go to mismatch tab
            await page.locator("#rc-tabs-0-tab-gsjr37b4i0s").click();

            //Check that our new customer is here 
            await expect (page.locator(".ant-table-row.ant-table-row-level-0")).toHaveCount(21);
        
       });

        test('Cehck that the User can switch view mode to mobile', async ({ page }) => {
            //Check that the User can press button "Settings"
            await page.getByTestId('plugin-settings-button').click();

            //Switch view mode to mobile
            await page.locator("[href='/admin/settings/mobile-client']").click();

            //Check that the User can scroll page
            await page.mouse.down();
            
            //Check that the User can switch tabs to "Contact"
            await page.getByText('Contact').click();


            //Check that the User can see details about contact by press button "Details"
            await page.getByLabel('action-Action.Link-Details-view-contact-grid-card-Mildred Weber').click();

            //Check that Details section is open 
            await page.locator(".ant-tabs.ant-tabs-top.css-19t1yef").isVisible();

            //Check that the User can close Details section and move to Company tab
            await page.goBack();

            //Check that the User can move to the next page
            await page.locator(".ant-pagination-next").click();
            await page.locator(".ant-pagination-next").click();
            await page.locator(".ant-pagination-next").click();
            await page.locator(".ant-pagination-next").click();
            
            //Check that the User on the 5th page
            await expect(page.locator('[title="5/5"]')).toBeVisible();

            //Check that the User can go to 1st page
            await page.locator(".ant-pagination-prev").click();
            await page.locator(".ant-pagination-prev").click();
            await page.locator(".ant-pagination-prev").click();
            await page.locator(".ant-pagination-prev").click();

            //Check that the User on the 1st page
            await expect(page.locator('[title="1/5"]')).toBeVisible();

            //Select options = 60 records on page
            await page.locator(".ant-pagination-options").click();
            await page.getByRole('option', { name: '60 / page' }).click();
            await page.mouse.down();
           
            //Select any company for open Detail sbout it, for example Tantamount Studios
            await page.getByLabel('action-Action.Link-Details-view-company-grid-card-Tantamount Studios').nth(1).click();

            //Check that Details about Tantamount Studios opened
            await page.locator('ant-drawer-body').isVisible();

            //Check that the User can go back
            await page.goBack();

        });

       
 });
