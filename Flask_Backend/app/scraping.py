from bs4 import BeautifulSoup
import requests
from datetime import datetime, timezone
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
    try:
        soup = BeautifulSoup(response.text, "html.parser")
        contest = soup.find("div", class_="events_eventDescCnt__13_9K").text
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
        contest_date = contest[0 : start_ind - 4].strip()
        contest_ = contest_date.split(" ")
        contest_month = contest_[1]
        contest_day = contest_[0]
        if len(contest_day) == 1:contest_day = "0" + contest_day
        contest_name = contest[start_ind: end_ind].strip()
        contest_year = "2024"
        contest_time = "13:30:00"
        contest_datetime = f"{contest_year}-{month_map[contest_month]}-{contest_day} {contest_time}"
        contest_datetime = datetime.strptime(contest_datetime, "%Y-%m-%d %H:%M:%S")
        temp_name = contest_name.replace(" ", "").lower()
        contest_link = f"https://practice.geeksforgeeks.org/contest/gfg-{temp_name}-rated-contest"
        return {"contest_info": {"contest_name": contest_name, "contest_datetime": contest_datetime.isoformat()+"+00:00", "contest_link": contest_link}}
    except (ValueError, TypeError) as e:
        return {"message": "Error", "Error" : e}

def scrape_cf():
    url = "https://codeforces.com/"
    response = requests.get(url, headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        contest = soup.find_all("div", class_="roundbox sidebox borderTopRound")[0].text
        link = soup.find_all("div", class_="roundbox sidebox borderTopRound")[0].find_all("a")[0].get("href")
        str = "Before contest"
        start_ind = contest.index(str) + len(str)
        end_ind = contest.index(')', start_ind)
        contest_name = contest[start_ind: end_ind + 1].strip().replace("Codeforces ", "")
        current_time = datetime.now(timezone.utc)
        time_ind = contest.find("days")
        if time_ind==-1:
            contest_time = contest[end_ind + 1: end_ind + 9].strip()
            temp = contest_time.split(":")
            h = int(temp[0])
            m = int(temp[1])
            s = int(temp[2])
            time_left = timedelta(days=0, hours=h, minutes=m, seconds=s)
            contest_link = f"https://codeforces.com{link}"
        else :
            contest_link = {"https://codeforces.com"}
            time_left = timedelta(days=int(contest[time_ind-1]), hours=0, mintutes=0, seconds=0)
        contest_time = current_time + time_left 
        return {"contest_info": {"contest_name": contest_name, "contest_datetime": contest_time.isoformat(), "contest_link": contest_link, "cuurent_time": current_time.isoformat()}}
    return {"message": "Error"}
