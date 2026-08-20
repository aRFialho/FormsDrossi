import type { IdentityMode } from './report-options'

export function getReportFormVisibility(
  identityMode: IdentityMode,
  wantsReturn: boolean,
) {
  return {
    showName: identityMode !== 'anonymous',
    showContact: wantsReturn,
  }
}
