using System;
using System.Text.RegularExpressions;

public class Validator
{
    // Validate the email
    public static bool IsValidEmail(string input)
    {
        string emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        return Regex.IsMatch(input, emailPattern);
    }

    // Validate the password
    public static bool IsValidPassword(string input)
    {
        string passwordPattern = @"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$";
        return Regex.IsMatch(input, passwordPattern);
    }
}
