export class ValidatorService {
  static ValidatePassword(password: string): boolean {
    if (!password.trim()) {
      alert("Empty field")
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  static ValidName(name: string): boolean {
    if (!name.trim()) {
      alert("Empty field")
      return false;
    }
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    return nameRegex.test(name);
  }

  static ValidPasswordRepeat(password: string, passwordRepeat: string): boolean {
    return password === passwordRepeat;
  }

  static ValidatePhone(phone: string): boolean {
    if (!phone.trim()) {
      alert("Empty field")
      return false;
    }
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  }
}

