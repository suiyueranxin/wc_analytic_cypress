class Variant {

    constructor() {
    }
    
    /********************************************************************
     * check points
    ********************************************************************/
    checkCurrentVariant() {
        // cy.get('.sapUICompVarMngmtLayout span[id$="text-inner"]').snapshot({name: 'currentVariant'});
        cy.get('.sapUICompVarMngmtLayout span[id$="text-inner"]').toMatchDomTextSnapShot();
    }
    
    /********************************************************************
     * get element content
    ********************************************************************/
  

    /********************************************************************
     * change element content
    ********************************************************************/
    expandList(){
        cy.get('.sapFDynamicPageTitleMain button.sapUICompVarMngmtTriggerBtn').click({force: true});
    }

    setAsDefault(name) {
        this.expandList();
        cy.get('div.sapMPopover button[id$="manage"]').click({force: true})
        cy.get('.sapMDialogOpen').within($dlg => {
            if ($dlg.find('td[id$="_cell1"]:contains("'+name+'")').length > 0) {
                cy.get('tr:has(td[id$="_cell1"]:contains("'+name+'")) div.sapMRbB').click({force: true});
            } else {
                cy.get('tr:has(td[id$="_cell1"] input[value="'+name+'"]) div.sapMRbB').click({force: true});
            }
            cy.get('button[id$="managementsave"]').click({force: true});
        }) 
    }

    saveAs(name, isPublic, isDefault) {
        this.expandList();
        cy.get('div.sapMPopover button[id$="saveas"]').click({force: true})
        cy.get('div.sapMDialogOpen').within($dlg => {
            cy.get('input.sapMInputBaseInner').clear({force: true}).type(name,{force: true});
            if (isPublic) {
                cy.get('div[role="checkbox"]:contains("Public")').click({force: true});
            }
            if (isDefault) {
                cy.get('div[role="checkbox"]:contains("Default")').click({force: true});
            }
            cy.get('button[id$="variantsave"]').click({force: true});
        })    
    }

    save(name) {
        this.expandList();
        cy.get('div.sapMPopover button[id$="save"]').click({force: true});
    }

    switchTo(name) {
        this.expandList();
        cy.get('div.sapMPopover li[role="option"]:contains("'+name+'")').click({force: true});
    }

    pinTo(title, group, subtitle, description) {
        cy.get('div.sapFDynamicPageTitleActionsBar button[title="Share"]').click({force: true})
        cy.get('div.sapMPopoverCont button:contains("Save as Tile")').click({force: true})
        cy.get('#bookmarkTitleInput-inner').type(title, {force: true});
        if (group) {
            cy.get('#groupsSelect').select(group);
        }
        cy.get('#bookmarkOkBtn').click({force: true});
        cy.wait(500);
    }

    remove(name) {
        this.expandList();
        cy.get('div.sapMPopover button[id$="manage"]').click({force: true})
        cy.get('.sapMDialogOpen').within($dlg => {
            cy.get('tr:has(td[id$="_cell1"] input[value="' + name + '"]) button[id*="-del-"]').click({force: true});
            cy.get('button[id$="managementsave"]').click({force: true});
        })  
    }

    removeAll() {
        this.expandList();
        cy.get('div.sapMPopover button[id$="manage"]').click({force: true})
        cy.get('.sapMDialogOpen').within($dlg => {
            let length = $dlg.find('tr:has(td[id$="_cell1"]) button[id*="-del-"]').length;
            while (length--) {
                cy.get('tr:has(td[id$="_cell1"]) button[id*="-del-"]').first().click({force: true});
            }
            cy.get('button[id$="managementsave"]').click({force: true});
        })  
    }
  }
  
  export default Variant;