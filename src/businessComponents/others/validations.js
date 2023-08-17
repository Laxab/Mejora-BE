


export const MobileValidation = { value:/^\d{10}$/, message:"Enter valid 10 digits mobile number" };


export const ValidateSQLInjection = (value) => {
    /*
        Clear out the special characters mentioned in regex - sqliRegex
        Allows: [space] ['] [,]
    */
    const sqliRegex = /['";<>%()|`~!$^&*=+/\\]+/;
    if (sqliRegex.test(value)) {
      return 'Field contains invalid characters';
    }
    return true;
  };


export const Pincode = { value:/^\d{6}$/, message:"Enter valid 6 digits Indian pin code" };
export const Mobile = { value:/^\d{10}$/, message:"Enter valid 10 digits contact number, please skip +91" };
export const IntLen4 = { value:/^(1|[1-9][0-9]{0,3})$/, message:"Enter valid number between 1 and 9999" };
export const IntLen3 = { value:/^\d{1,3}$/, message:"Enter valid number with max length 3" };
export const mrp = { value:/^(1[0-9]{1,3}|[2-9][0-9]{1,3}|9999)$/, message:"Enter valid MRP between 10 and 9999" };

export const EmailValidation = {value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message:"Enter valid email address"};