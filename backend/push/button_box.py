import PySimpleGUI as sg


webinarTitle = "CEP Conference 2022"
webinarDate = "01 Jun 2022 - 9:00AM"
cpdHours = "14.00"
webinarPrice = "1195.00"
message = "Webinar: " + webinarTitle + "\n" + "Date: " + webinarDate + "\nCPD Hours: " + cpdHours + "\nPrice: $" + webinarPrice

secondTitle = "Nelson-Marlborough Speed Interviews"
secondDate = "01 Jun 2022 - 5:00PM"
secondHours = "1.30"
secondPrice = "Free"
second = "Webinar: " + secondTitle + "\nDate: " + secondDate + "\nCPD Hours: " + secondHours + "\nPrice: " + secondPrice

bigSpace = "\n\n"

thirdTitle = "Journey To Rainbow Tick"
thirdDate = "01 Jun 2022 - 5:00PM"
thirdHours = "1.00"
thirdPrice = "Free"
third = "Webinar: " + thirdTitle + "\nDate: " + thirdDate + "\nCPD Hours: " + thirdHours + "\nPrice: " + thirdPrice

bigSpace = "\n-----------------------------------------------------------------\n"


layout = [[sg.Text(message)], [sg.Button("BOOK")], [sg.Text(bigSpace)], [sg.Text(second)], [sg.Button("BOOK")], [sg.Text(bigSpace)], [sg.Text(third)], [sg.Button("BOOK")]]

# Create the window
window = sg.Window("CPD HUB", layout)




# Create an event loop
while True:
    event, values = window.read()
    # End program if user closes window or
    # presses the OK button
    if event == "OK" or event == sg.WIN_CLOSED:
        break

window.close()