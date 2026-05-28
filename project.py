#author: kresha Vora

"""Birthday counter.

The user enters a birth day and month, and the script prints how many days are
left until the next matching birthday.
"""

from calendar import monthrange
from datetime import date


def is_valid_birth_date(day: int, month: int) -> bool:
    """Return True when the day exists in the given month.

    February 29 is allowed so leap-day birthdays can be entered.
    """

    if month < 1 or month > 12:
        return False

    max_day = monthrange(2000, month)[1]
    return 1 <= day <= max_day


def next_birthday(day: int, month: int, today: date) -> date:
    """Find the next valid birthday on or after today."""

    year = today.year

    while True:
        try:
            birthday = date(year, month, day)
        except ValueError:
            year += 1
            continue

        if birthday >= today:
            return birthday

        year += 1


birth_day = int(input("Enter your birth day 1-31: "))
birth_month = int(input("Enter your birth month 1-12: "))

if not is_valid_birth_date(birth_day, birth_month):
    print("Please enter a valid day and month.")
else:
    today = date.today()
    birthday = next_birthday(birth_day, birth_month, today)
    remaining_days = (birthday - today).days

    if remaining_days == 0:
        print("Happy Birthday!")
    else:
        print(f"Your next birthday is in {remaining_days} days.")