/* eslint-disable consistent-return */
import CryptoJS from 'crypto-js';
import localForage from 'localforage';

/**
 *  使用方法：
 *
 *  import localStore from '@/path/to/localStore';
 *
 *  ==================== async/await =================
 *
 *  const asyncFunc = async () => {
 *    await localStore.setItem('somekey', 'somevalue');
 *    const value = await localStore.getItem('somekey');
 *    console.log(value);
 *    await localStore.removeItem('somekey');
 *    await localStore.clear()
 *  }
 *
 *  asyncFunc();
 *
 *  ===================== promise ====================
 *
 *  localStore.getItem('somekey').then((value) => {
 *     console.log(value);
 *  })
 *
 *  localStore.clear().then(() => {})
 */

class LocalStore {
  private readonly aesKey = '%*rih&pt#Y018Ec0';

  async getItem(key: string) {
    try {
      const ciphertext: any = await localForage.getItem(key);
      const bytes = CryptoJS.AES.decrypt(ciphertext, this.aesKey);
      const originalValue = bytes.toString(CryptoJS.enc.Utf8);

      if (!originalValue) {
        return null;
      }

      try {
        return JSON.parse(originalValue);
      } catch (err) {
        return originalValue;
      }
    } catch (e) {
      return null;
    }
  }

  async setItem(key: string, value: any) {
    try {
      const jsonValue = JSON.stringify(value);

      const ciphertext = CryptoJS.AES.encrypt(
        jsonValue,
        this.aesKey,
      ).toString();

      return await localForage.setItem(key, ciphertext);
    } catch (e) {
      console.log(e);
    }
  }

  async removeItem(key: string) {
    try {
      return await localForage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  }

  async clear() {
    try {
      return await localForage.clear();
    } catch (e) {
      console.log(e);
    }
  }
}

export default new LocalStore();
