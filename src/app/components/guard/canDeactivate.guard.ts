import { CanDeactivateFn } from '@angular/router';
import { Injectable } from '@angular/core';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

export interface CanDeactivateConfig {
  message?: string;
  condition?: () => boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuardService {
  static createGuard(config?: CanDeactivateConfig): CanDeactivateFn<CanComponentDeactivate> {
    return (component) => {
      if (component?.canDeactivate) {
        return component.canDeactivate();
      }

      if (config?.condition && !config.condition()) {
        return true;
      }

      const message =
        config?.message || 'You have unsaved changes. Are you sure you want to leave?';
      return confirm(message);
    };
  }
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> =
  CanDeactivateGuardService.createGuard();

export const formCanDeactivateGuard = CanDeactivateGuardService.createGuard({
  message: 'You have unsaved form changes. Are you sure you want to leave?',
});

export const unsavedChangesGuard = CanDeactivateGuardService.createGuard({
  message: 'You have unsaved changes. Are you sure you want to navigate away?',
});
