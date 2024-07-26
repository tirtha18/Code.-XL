from bs4 import BeautifulSoup
import requests
from datetime import datetime
from datetime import timedelta
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
}
def scrape_gfg():
    url = "https://www.geeksforgeeks.org/events/rec/gfg-weekly-coding-contest"
    response = requests.get(url, headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        contest = soup.find(
            "div", class_="events_eventDescCnt__13_9K").text
        str = "GFG "
        start_ind = contest.index(str) + len(str)
        end_ind = contest.index("[")
        month_map = {
            "January": "1",
            "February": "2",
            "March": "3",
            "April": "4",
            "May": "5",
            "June": "6",
            "July": "7",
            "August": "8",
            "September": "9",
            "October": "10",
            "November": "11",
            "December": "12"
        }

        contest_date = contest[0: start_ind - 4].strip()
        contest_ = contest_date.split(" ")
        contest_month = contest_[1]
        contest_day = contest_[0]
        if len(contest_day) == 1:
            contest_day = "0" + contest_day
        contest_name = contest[start_ind: end_ind].strip()
        contest_year = "2024"
        contest_time = "13:30:00"
        contest_datetime = f"{
            contest_year}-{month_map[contest_month]}-{contest_day} {contest_time}"
        contest_datetime = datetime.strptime(
            contest_datetime, "%Y-%m-%d %H:%M:%S")
        return {"contest_info": {"contest_name:": contest_name, "contest_datetime": contest_datetime, "contest_link": ""}}
    return {"message": "Error"}


def scrape_cf():
    url = "https://codeforces.com/"
    response = requests.get(url, headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        contest = soup.find_all(
            "div", class_="roundbox sidebox borderTopRound")[0].text
        str = "Before contest"
        start_ind = contest.index(str) + len(str)
        end_ind = contest.index(')', start_ind)
        contest_name = contest[start_ind: end_ind + 1].strip()
        current_time = datetime.now()
        contest_time = contest[end_ind + 1: end_ind + 9].strip()
        temp = contest_time.split(":")
        h = int(temp[0])
        m = int(temp[1])
        s = int(temp[2])
        contest_time = current_time + \
            timedelta(days=0, hours=h, minutes=m, seconds=s)
        return {"contest_info": {"contest_name:": contest_name, "contest_datetime": contest_time, "contest_link": ""}}
    return {"message": "Error"}
