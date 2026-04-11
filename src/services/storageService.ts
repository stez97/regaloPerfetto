/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const storage = {
  get: <T>(key: string): T | null => {
    const data = localStorage.getItem(`regaloperfetto_${key}`);
    return data ? JSON.parse(data) : null;
  },
  set: <T>(key: string, value: T): void => {
    localStorage.setItem(`regaloperfetto_${key}`, JSON.stringify(value));
  },
  remove: (key: string): void => {
    localStorage.removeItem(`regaloperfetto_${key}`);
  }
};
