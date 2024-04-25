import * as StepType from '../util/StepType'

export const Log = function(desp, stepType, skip){  
    return (target, prototype, descriptor) => {
        if (Cypress.env('detailLog') && !skip) {
            let func = descriptor.value;
            descriptor.value = function(...args) {
                if (!stepType) {
                    stepType = func.name.startsWith('check')? StepType.ASSERT: StepType.ACTION;
                }
                let startMsg = desp || 'Please add step description by @Log()!';
                let endMsg = func.name;
                cy.startStep(startMsg, stepType);
                cy.subStep(func.name, StepType.FUNC)
                cy.subStep(args.toString(), StepType.ARGS)
                try {
                    return func.apply(this, args);
                } finally {
                    cy.endStep(endMsg, stepType);
                }
            }
        }
        return descriptor;
    };
} 

