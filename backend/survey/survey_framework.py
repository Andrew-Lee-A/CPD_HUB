from tkinter import (Tk, Label, Button, Radiobutton, Frame, Menu,
    messagebox, StringVar, Listbox, BROWSE, END, Toplevel, Entry)
from tkinter import ttk
from tkinter import messagebox
import pathlib
import time
import csv
import os.path

# create empty lists used for each set of questions
lifestyle_list = []
sig_trends_list = []
future_trends_list = []
general_answers_list = []

def dialogBox(title, message):
    """
    Basic function to create and display general dialog boxes.
    """
    dialog = Tk()
    dialog.wm_title(title)
    dialog.grab_set()
    dialogWidth, dialogHeight = 225, 125
    positionRight = int(dialog.winfo_screenwidth()/2 - dialogWidth/2)
    positionDown = int(dialog.winfo_screenheight()/2 - dialogHeight/2)
    dialog.geometry("{}x{}+{}+{}".format(
        dialogWidth, dialogHeight, positionRight, positionDown))
    dialog.maxsize(dialogWidth, dialogHeight)
    label = Label(dialog, text=message)
    label.pack(side="top", fill="x", pady=10)
    ok_button = ttk.Button(dialog, text="Ok", command=dialog.destroy)
    ok_button.pack(ipady=3, pady=10)
    dialog.mainloop()

def nextSurveyDialog(title, message, cmd):
    """
    Dialog box that appears before moving onto the next set of questions.
    """
    dialog = Tk()
    dialog.wm_title(title)
    dialog.grab_set()
    dialogWidth, dialogHeight = 225, 125
    positionRight = int(dialog.winfo_screenwidth()/2 - dialogWidth/2)
    positionDown = int(dialog.winfo_screenheight()/2 - dialogHeight/2)
    dialog.geometry("{}x{}+{}+{}".format(
        dialogWidth, dialogHeight, positionRight, positionDown))
    dialog.maxsize(dialogWidth, dialogHeight)
    dialog.overrideredirect(True)
    label = Label(dialog, text=message)
    label.pack(side="top", fill="x", pady=10)
    ok_button = ttk.Button(dialog, text="Begin", command=lambda: [f() for f in [cmd, dialog.destroy]])
    ok_button.pack(ipady=3, pady=10)

    dialog.protocol("WM_DELETE_WINDOW", disable_event) # prevent user from clicking ALT + F4 to close
    dialog.mainloop()

def disable_event():
    pass

def finishedDialog(title, message):
    """
    Display the finished dialog box when user reaches the end of the survey.
    """
    dialog = Tk()
    dialog.wm_title(title)
    dialog.grab_set()
    dialogWidth, dialogHeight = 325, 150
    positionRight = int(dialog.winfo_screenwidth()/2 - dialogWidth/2)
    positionDown = int(dialog.winfo_screenheight()/2 - dialogHeight/2)
    dialog.geometry("{}x{}+{}+{}".format(
        dialogWidth, dialogHeight, positionRight, positionDown))
    dialog.maxsize(dialogWidth, dialogHeight)
    dialog.overrideredirect(True)
    label = Label(dialog, text=message)
    label.pack(side="top", fill="x", pady=10)
    ok_button = ttk.Button(dialog, text="Quit", command=quit)
    ok_button.pack(ipady=3, pady=10)

    dialog.protocol("WM_DELETE_WINDOW", disable_event) # prevent user from clicking ALT + F4 to close
    dialog.mainloop()

def writeToFile(filename, answer_list):
        """
        Called at end of program when user selects finished button, 
        write all lists to separate files.
        Parameters: filename: name for save file,
                    answer_list: list containing answer from that one of the 
                    four sections in the survey.
        """
        headers = []  
        file_exists = os.path.isfile(filename)

        with open(filename, 'a') as csvfile:
            for i in range(1, len(answer_list) + 1):
                headers.append("Q{}".format(i))
            writer = csv.writer(csvfile, delimiter=',', lineterminator='\n')
            
            if not file_exists:
                writer.writerow(headers) # file doesn't exist yet, write a header

            writer.writerow(answer_list)

class otherPopUpDialog(object):
    """
    Class for 'other' selections in General Question class.
    When user selects 'other' option, they are able to input 
    their answer into an Entry widget.
    self.value: the value of Entry widget.
    """
    def __init__(self, master, text):
        top=self.top=Toplevel(master)
        self.text = text
        top.wm_title("Other Answers")
        top.grab_set()
        dialogWidth, dialogHeight = 200, 150
        positionRight = int(top.winfo_screenwidth()/2 - dialogWidth/2)
        positionDown = int(top.winfo_screenheight()/2 - dialogHeight/2)
        top.geometry("{}x{}+{}+{}".format(
        dialogWidth, dialogHeight, positionRight, positionDown))
        self.label = Label(top, text=self.text)
        self.label.pack(ipady=5)
        self.enter = Entry(top)
        self.enter.pack(ipady=5)
        self.ok_button = Button(top, text="Ok", command=self.cleanup) 
        self.ok_button.pack(ipady=5)

    def cleanup(self):
        """
        Get input from Entry widget and close dialog.
        """
        self.value = self.enter.get()
        self.top.destroy()

class Survey(Tk):
    """
    Main class, define the container which will contain all the frames.
    """
    def __init__(self, *args, **kwargs):
        Tk.__init__(self, *args, **kwargs)

        # call closing protocol to create dialog box to ask 
        # if user if they want to quit or not.
        self.protocol("WM_DELETE_WINDOW", self.on_closing)

        Tk.wm_title(self, "Survey (?????????)")

        # get position of window with respect to screen
        windowWidth, windowHeight = 555, 400
        positionRight = int(Tk.winfo_screenwidth(self)/2 - windowWidth/2)
        positionDown = int(Tk.winfo_screenheight(self)/2 - windowHeight/2)
        Tk.geometry(self, newGeometry="{}x{}+{}+{}".format(
            windowWidth, windowHeight, positionRight, positionDown))
        Tk.maxsize(self, windowWidth, windowHeight)

        # Create container Frame to hold all other classes, 
        # which are the different parts of the survey.
        container = Frame(self)
        container.pack(side="top", fill="both", expand=True)
        container.grid_rowconfigure(0, weight=1)
        container.grid_columnconfigure(0, weight=1)

        # Create menu bar
        menubar = Menu(container)
        filemenu = Menu(menubar, tearoff=0)
        filemenu.add_command(label="Quit", command=quit)
        menubar.add_cascade(label="File", menu=filemenu)
        
        Tk.config(self, menu=menubar)

        # create empty dictionary for the different frames (the different classes)
        self.frames = {}

        for fr in (StartPage, LifeStyleSurveyPages, SignificantConsumptionTrendsSurveyPages,
            FutureConsumptionTrendsSurveyPages, GenderQuestion,
            MarriageQuestion, AgeQuestion, WorkQuestion, EdBackgroundQuestion, 
            SalaryQuestion, RelationQuestion, TimeQuestion, TransitQuestion,
            ExpensesQuestion):
            frame = fr(container, self)
            self.frames[fr] = frame
            frame.grid(row=0, column=0, sticky="nsew")

        self.show_frame(StartPage)

    def on_closing(self):
        """
        Display dialog box before quitting.
        """
        if messagebox.askokcancel("Quit", "Do you want to quit?"):
            self.destroy()

    def show_frame(self, cont):
        """
        Used to display a frame.
        """
        frame = self.frames[cont]
        frame.tkraise() # bring a frame to the "top"

class StartPage(Frame):
    """
    First page that user will see.
    Explains the rules and any extra information the user may need 
    before beginning the survey.
    User can either click one of the two buttons, Begin Survey or Quit.
    """
    def __init__(self, master, controller):
        Frame.__init__(self, master)
        self.controller = controller

        # set up start page window
        self.configure(bg="#EFF3F6")
        start_label = Label(self, text="Survey", font=("Verdana", 16), 
                            borderwidth=2, relief="ridge")
        start_label.pack(pady=10, padx=10, ipadx=5, ipady=3)

        # add labels and buttons to window
        info_text = "Thank you for participating in our survey.\nThe survey is composed of 4 four parts:\nLifestyle: 25 questions\nConsumption Trends: 16 questions\nFuture Consumption Trends: 5 questions\nGeneral Information: 10 questions\n\nAfter each section, a small window will notify you."
        info_label = Label(self, text=info_text, font=("Verdana", 12),
                           borderwidth=2, relief="ridge")
        info_label.pack(pady=10, padx=10, ipadx=20, ipady=3)

        purpose_text = "Explain here the purpose of the survey."
        purpose_text = Label(self, text=purpose_text, font=("Verdana", 12),
                           borderwidth=2, relief="ridge")
        purpose_text.pack(pady=10, padx=10, ipadx=5, ipady=3)

        start_button = ttk.Button(self, text="Begin Survey", 
            command=lambda: controller.show_frame(LifeStyleSurveyPages))
        start_button.pack(ipadx=10, ipady=15, pady=15)

        quit_button = ttk.Button(self, text="Quit", command=self.on_closing)
        quit_button.pack(ipady=3, pady=10)

    def on_closing(self):
        """
        Display dialog box before quitting.
        """
        if messagebox.askokcancel("Quit", "Do you want to quit?"):
            self.controller.destroy()

class LifeStyleSurveyPages(Frame):
    """
    Class that displays the window for the life style survey questions. 
    When the user answers a question, the answer saved to a list.  
    """
    def __init__(self, master, controller):
        Frame.__init__(self, master)
        self.controller = controller

        global lifestyle_list

        # Create header label
        ttk.Label(self, text="????????????", font=('Verdana', 20),
                  borderwidth=2, relief="ridge").pack(padx=10, pady=10)

        self.questions = ["??????????????????????????????", "????????????????????????????????????????????????", 
                          "??????????????????????????????", "????????????????????????????????????????????????",
                          "??????????????????????????????????????????", "???????????????????????????????????????",
                          "??????????????????????????????,????????????????????????", "????????????????????????????????????",
                          "??????????????????????????????????????????", "??????????????????????????????????????????",
                          "??????????????????????????????", "?????????????????????????????????????????????",
                          "??????????????????????????????????????????", "?????????????????????????????????????????????",
                          "??????????????????????????????", "???????????????????????????????????????????????????", 
                          "????????????????????????????????????????????????", "?????????????????????,????????????????????????????????????",
                          "???????????????????????????,????????????????????????????????????", "???????????????????????????????????????",
                          "???????????????????????????????????????", "??????????????????????????????????????????",
                          "???????????????,???????????????????????????", "????????????????????????????????????????????????",
                          "?????????????????????,????????????????????????????????????"]

        # set index in questions list 
        self.index = 0
        self.length_of_list = len(self.questions)

        # Set up labels and checkboxes 
        self.question_label = Label(self, text="{}. {}".format(self.index + 1, self.questions[self.index]), font=('Verdana', 16))
        self.question_label.pack(anchor='w', padx=20, pady=10)
        Label(self, text="??????????????????????????????", font=('Verdana', 10)).pack(padx=50)

        # Not at all, somewhat, average, agree, strongly agree
        scale_text = ["?????????", "????????????", "????????????", "????????????", "????????????"]

        scale = [("1", 1), ("2", 2), ("3", 3), ("4", 4), ("5", 5)]

        self.var = StringVar()
        self.var.set(0) # initialize

        # Frame to contain text 
        checkbox_scale_frame = Frame(self, borderwidth=2, relief="ridge")
        checkbox_scale_frame.pack(pady=2)

        for text in scale_text:
            b = ttk.Label(checkbox_scale_frame, text=text)
            b.pack(side='left', ipadx=7, ipady=5)

        # Frame to contain checkboxes
        checkbox_frame = Frame(self, borderwidth=2, relief="ridge")
        checkbox_frame.pack(pady=10, anchor='center')

        for text, value in scale:
            b = ttk.Radiobutton(checkbox_frame, text=text, 
                variable=self.var, value=value)
            b.pack(side='left', ipadx=17, ipady=2)

        # Create next question button
        enter_button = ttk.Button(self, text="Next Question", command=self.nextQuestion)
        enter_button.pack(ipady=5, pady=20)
        
    def nextQuestion(self):
        '''
        When button is clicked, add user's input to a list
        and display next question.
        '''
        answer = self.var.get()

        if answer == '0':
            dialogBox("No Value Given", 
                "You did not select an answer.\nPlease try again.")
        elif self.index == (self.length_of_list - 1):
            # get the last answer from user
            selected_answer = self.var.get()
            lifestyle_list.append(selected_answer)

            next_survey_text = "End of Part 1."
            nextSurveyDialog("Next Survey", next_survey_text, lambda: self.controller.show_frame(SignificantConsumptionTrendsSurveyPages))
        else:
            self.index = (self.index + 1) % self.length_of_list

            self.question_label.config(text="{}. {}".format(self.index + 1, self.questions[self.index]))
            selected_answer = self.var.get()
            lifestyle_list.append(selected_answer)

            self.var.set(0) # reset value for next question

            time.sleep(.2) # delay between questions

class SignificantConsumptionTrendsSurveyPages(Frame):
    """
    Class that displays the window for the significant consumption trends survey questions. 
    When the user answers a question, the answer is written to a 
    csv file. 
    """
    def __init__(self, master, controller):
        Frame.__init__(self, master)
        self.controller = controller

        global sig_trends_list

        # Create header label
        ttk.Label(self, text="?????????????????????", font=('Verdana', 20),
                  borderwidth=2, relief="ridge").pack(padx=10, pady=10)

        self.questions = ["?????????????????????????????????????????????????????????", "????????????????????????????????????",
                          "??????????????????????????????????????????", "??????????????????????????????????????????", 
                          "????????????????????????????????????", "????????????????????????????????????????????????",
                          "???????????????????????????????????????????????????", "??????????????????????????????????????????",
                          "???????????????????????????????????????", "???????????????????????????????????????????????????", 
                          "????????????????????????????????????", "?????????????????????????????????", 
                          "?????????????????????????????????", "?????????????????????????????????", 
                          "????????????????????????????????????????????????", "???????????????????????????????????????????????????"]

        # set index in questions list 
        self.index = 0
        self.length_of_list = len(self.questions)

        # Set up labels and checkboxes 
        self.question_label = Label(self, text="{}. {}".format(self.index + 1, self.questions[self.index]), font=('Verdana', 16))
        self.question_label.pack(anchor='w', padx=20, pady=10)
        Label(self, text="??????????????????????????????", font=('Verdana', 10)).pack(padx=50)

        # Not at all, somewhat, average, agree, strongly agree
        scale_text = ["?????????", "????????????", "????????????", "????????????", "????????????"]

        scale = [("1", 1), ("2", 2), ("3", 3), ("4", 4), ("5", 5)]

        self.var = StringVar()
        self.var.set(0) # initialize

        # Frame to contain text 
        checkbox_scale_frame = Frame(self, borderwidth=2, relief="ridge")
        checkbox_scale_frame.pack(pady=2)

        for text in scale_text:
            b = ttk.Label(checkbox_scale_frame, text=text)
            b.pack(side='left', ipadx=7, ipady=5)

        # Frame to contain checkboxes
        checkbox_frame = Frame(self, borderwidth=2, relief="ridge")
        checkbox_frame.pack(pady=10, anchor='center')

        for text, value in scale:
            b = ttk.Radiobutton(checkbox_frame, text=text, 
                variable=self.var, value=value)
            b.pack(side='left', ipadx=17, ipady=2)

        enter_button = ttk.Button(self, text="Next Question", command=self.nextQuestion)
        enter_button.pack(ipady=5, pady=20)
        
    def nextQuestion(self):
        '''
        When button is clicked, add user's input to a list
        and display next question.
        '''
        answer = self.var.get()

        if answer == '0':
            dialogBox("No Value Given", 
                "You did not select an answer.\nPlease try again.")
        elif self.index == (self.length_of_list - 1):
            # get the last answer from user
            selected_answer = self.var.get()
            sig_trends_list.append(selected_answer)

            next_survey_text = "End of Part 2."
            nextSurveyDialog("Next Survey", next_survey_text, lambda: self.controller.show_frame(FutureConsumptionTrendsSurveyPages))
        else:
            self.index = (self.index + 1) % self.length_of_list

            self.question_label.config(text="{}. {}".format(self.index + 1, self.questions[self.index]))
            selected_answer = self.var.get()
            sig_trends_list.append(selected_answer)

            self.var.set(0) # reset value for next question

            time.sleep(.2) # delay between questions

class FutureConsumptionTrendsSurveyPages(Frame):
    """
    Class that displays the window for the future consumption trends survey questions. 
    When the user answers a question, the answer is written to a 
    csv file. 
    """
    def __init__(self, master, controller):
        Frame.__init__(self, master)
        self.controller = controller

        global future_trends_list

        # Create header label
        ttk.Label(self, text="??????????????????", font=('Verdana', 20),
                  borderwidth=2, relief="ridge").pack(padx=10, pady=10)

        self.questions = ["???????????????????????????????????????", "????????????????????????????????????????????????",
                          "??????????????????????????????????????????????????????????????????", "????????????????????????????????????????????????",
                          "??????????????????????????????"]

        # set index in questions list 
        self.index = 0
        self.length_of_list = len(self.questions)

        # Set up labels and checkboxes 
        self.question_label = Label(self, text="{}. {}".format(self.index + 1, self.questions[self.index]), font=('Verdana', 16))
        self.question_label.pack(anchor='w', padx=20, pady=10)
        Label(self, text="??????????????????????????????", font=('Verdana', 10)).pack(padx=50)

        scale_text = ["?????????", "????????????", "????????????", "????????????", "????????????"]

        # Not at all, somewhat, average, agree, strongly agree
        scale = [("1", 1), ("2", 2), ("3", 3), ("4", 4), ("5", 5)]

        self.var = StringVar()
        self.var.set(0) # initialize

        # Frame to contain text 
        checkbox_scale_frame = Frame(self, borderwidth=2, relief="ridge")
        checkbox_scale_frame.pack(pady=2)

        for text in scale_text:
            b = ttk.Label(checkbox_scale_frame, text=text)
            b.pack(side='left', ipadx=7, ipady=5)

        # Frame to contain checkboxes
        checkbox_frame = Frame(self, borderwidth=2, relief="ridge")
        checkbox_frame.pack(pady=10, anchor='center')

        for text, value in scale:
            b = ttk.Radiobutton(checkbox_frame, text=text, 
                variable=self.var, value=value)
            b.pack(side='left', ipadx=17, ipady=2)

        enter_button = ttk.Button(self, text="Next Question", command=self.nextQuestion)
        enter_button.pack(ipady=5, pady=20)

    def nextQuestion(self):
        '''
        When button is clicked, add user's input to a list
        and display next question.
        '''
        answer = self.var.get()

        if answer == '0':
            dialogBox("No Value Given", 
                "You did not select an answer.\nPlease try again.")
        elif self.index == (self.length_of_list - 1):
            # get the last answer from user
            selected_answer = self.var.get()

            future_trends_list.append(selected_answer)

            next_survey_text = "End of Part 3."
            nextSurveyDialog("Next Survey", next_survey_text, lambda: self.controller.show_frame(GenderQuestion))
        else:
            self.index = (self.index + 1) % self.length_of_list

            self.question_label.config(text="{}. {}".format(self.index + 1, self.questions[self.index]))
            selected_answer = self.var.get()

            future_trends_list.append(selected_answer)

            self.var.set(0) # reset value for next question

            time.sleep(.2) # delay between questions

class GenderQuestion(Frame):
    """
    Displays gender question from General questions.
    """
    def __init__(self, master, controller):
        Frame.__init__(self, master)
        self.controller = controller

        global general_answers_list

        # Create header label
        ttk.Label(self, text="????????????", font=('Verdana', 20), 
                  borderwidth=2, relief="ridge").pack(padx=10, pady=10)

        self.question = "????????????"

        # Set up labels and checkboxes 
        self.question_label = Label(self, text="1. {}".format(self.question), font=('Verdana', 16))
        self.question_label.pack(anchor='w', padx=20, pady=10)
        Label(self, text="??????????????????????????????", font=('Verdana', 10)).pack(padx=50)

        choices = [("???", "???"), ("???", "???")]

        self.var = StringVar()
        self.var.set(0) # initialize

        # Frame to contain checkboxes
        checkbox_frame = Frame(self, borderwidth=2, relief="ridge")
        checkbox_frame.pack(pady=10, anchor='center')

        for text, value in choices:
            b = ttk.Radiobutton(checkbox_frame, text=text, 
                variable=self.var, value=value)
            b.pack(side='left', ipadx=17, ipady=2)

        enter_button = ttk.Button(self, text="Next Question", command=self.nextQuestion)
        enter_button.pack(ipady=5, pady=20)

    def nextQuestion(self):
        '''
        When button is clicked, add user's input to a list
        and display next question.
        '''
        answer = self.var.get()

        if answer == '0':
            dialogBox("No Value Given", 
                "You did not select an answer.\nPlease try again.")
        else:
            selected_answer = self.var.get()
            general_answers_list.append(selected_answer)

            time.sleep(.2) # delay between questions

            self.controller.show_frame(MarriageQuestion)

class MarriageQuestion(Frame):
    """
    Displays marriage question from General questions.
    """
    def __init__(self, master, controller):
        Frame.__init__(self, master)
        self.controller = controller

        global general_answers_list

        # Create header label
        ttk.Label(self, text="????????????", font=('Verdana', 20), 
                  borderwidth=2, relief="ridge").pack(padx=10, pady=10)

        self.question = "?????????????"

        # Set up labels and checkboxes 
        self.question_label = Label(self, text="2. {}".format(self.question), font=('Verdana', 16))
        self.question_label.pack(anchor='w', padx=20, pady=10)
        Label(self, text="??????????????????????????????", font=('Verdana', 10)).pack(padx=50)

        choices = [("?????????", "?????????"), ("??????", "??????")]

        self.var = StringVar()
        self.var.set(0) # initialize

        # Frame to contain checkboxes
        checkbox_frame = Frame(self, borderwidth=2, relief="ridge")
        checkbox_frame.pack(pady=10, anchor='center')

        for text, value in choices:
            b = ttk.Radiobutton(checkbox_frame, text=text, 
                variable=self.var, value=value)
            b.pack(side='left', ipadx=17, ipady=2)

        enter_button = ttk.Button(self, text="Next Question", command=self.nextQuestion)
        enter_button.pack(ipady=5, pady=20)

    def nextQuestion(self):
        '''
        When button is clicked, add user's input to a list
        and display next question.
        '''
        answer = self.var.get()

        if answer == '0':
            dialogBox("No Value Given", 
                "You did not select an answer.\nPlease try again.")
        else:
            selected_answer = self.var.get()
            general_answers_list.append(selected_answer)

            time.sleep(.2) # delay between questions

            self.controller.show_frame(AgeQuestion)

class AgeQuestion(Frame):
    """
    Displays age question from General questions.
    """
    def __init__(self, master, controller):
        Frame.__init__(self, master)
        self.controller = controller

        global general_answers_list

        # Create header label
        ttk.Label(self, text="????????????", font=('Verdana', 20), 
                  borderwidth=2, relief="ridge").pack(padx=10, pady=10)

        self.question = "??????????????????? "

        # Set up labels and checkboxes 
        self.question_label = Label(self, text="3. {}".format(self.question), font=('Verdana', 16))
        self.question_label.pack(anchor='w', padx=20, pady=10)
        Label(self, text="??????????????????????????????", font=('Verdana', 10)).pack(padx=50)

        choices = [("10???20", "10???20"), ("20???30", "20???30"), ("30???40", "30???40"),
                 ("40???50", "40???50"), ("50??????", "50??????")]

        self.var = StringVar()
        self.var.set(0) # initialize

        # Frame to contain checkboxes
        checkbox_frame = Frame(self, borderwidth=2, relief="ridge")
        checkbox_frame.pack(pady=10, anchor='center')

        for text, value in choices:
            b = ttk.Radiobutton(checkbox_frame, text=text, 
                variable=self.var, value=value)
            b.pack(side='left', ipadx=12, ipady=2)

        enter_button = ttk.Button(self, text="Next Question", command=self.nextQuestion)
        enter_button.pack(ipady=5, pady=20)

    def nextQuestion(self):
        '''
        When button is clicked, add user's input to a list
        and display next question.
        '''
        answer = self.var.get()

        if answer == '0':
            dialogBox("No Value Given", 
                "You did not select an answer.\nPlease try again.")
        else:
            selected_answer = self.var.get()
            general_answers_list.append(selected_answer)

            time.sleep(.2) # delay between questions

            self.controller.show_frame(WorkQuestion)

class WorkQuestion(Frame):
    """
    Displays work question from General questions.
    """
    def __init__(self, master, controller):
        Frame.__init__(self, master)
        self.controller = controller

        global general_answers_list

        # Create header label
        ttk.Label(self, text="????????????", font=('Verdana', 20), 
                  borderwidth=2, relief="ridge").pack(padx=10, pady=10)

        self.question = "?????????????????????? "

        # Set up labels and listbox 
        self.question_label = Label(self, text="4. {}".format(self.question), font=('Verdana', 16))
        self.question_label.pack(anchor='w', padx=20, pady=10)
        Label(self, text="??????????????????????????????", font=('Verdana', 10)).pack(padx=50)

        choices = ["??????", "????????????", "?????????", "??????", "?????????", "????????????", 
                   "????????????", "???????????????", "??????"]

        self.lb_choices = Listbox(self, selectmode=BROWSE, width=20, borderwidth=3, relief="ridge")
        self.lb_choices.pack(ipady=5, ipadx=5)

        for ch in choices:
            self.lb_choices.insert(END, ch)

        self.enter_button = ttk.Button(self, text="Next Question", command=self.nextQuestion)
        self.enter_button.pack(ipady=5, pady=20)

    def nextQuestion(self):
        '''
        When button is clicked, add user's input to a list
        and display next question.
        '''
        selection = self.lb_choices.curselection()        

        if len(selection) == 0:
            dialogBox("No Value Given", 
                "You did not select an answer.\nPlease try again.")
        elif  selection == (8,):
            self.other_window = otherPopUpDialog(self.master, text="Other Occupation:")
            self.enter_button["state"] = "disabled"
            self.master.wait_window(self.other_window.top)
            self.enter_button["state"] = "normal"

            get_other = self.other_window.value
            general_answers_list.append(get_other)

            time.sleep(.2) # delay between questions

            self.controller.show_frame(EdBackgroundQuestion)
        else:
            get_selection = self.lb_choices.get(selection)
            general_answers_list.append(get_selection)

            time.sleep(.2) # delay between questions

            self.controller.show_frame(EdBackgroundQuestion)

class EdBackgroundQuestion(Frame):
    """
    Displays education background question from General questions.
    """
    def __init__(self, master, controller):
        Frame.__init__(self, master)
        self.controller = controller

        global general_answers_list

        # Create header label
        ttk.Label(self, text="????????????", font=('Verdana', 20), 
                  borderwidth=2, relief="ridge").pack(padx=10, pady=10)

        self.question = "???????????? "

        # Set up labels and checkboxes 
        self.question_label = Label(self, text="5. {}".format(self.question), font=('Verdana', 16))
        self.question_label.pack(anchor='w', padx=20, pady=10)
        Label(self, text="??????????????????????????????", font=('Verdana', 10)).pack(padx=50)

        scale = [("????????????", "????????????"), ("????????????", "????????????"), ("????????????", "????????????"),
                 ("????????????", "????????????"), ("???????????????", "???????????????")]

        self.var = StringVar()
        self.var.set(0) # initialize

        # Frame to contain checkboxes
        checkbox_frame = Frame(self, borderwidth=2, relief="ridge")
        checkbox_frame.pack(pady=10, anchor='center')

        for text, value in scale:
            b = ttk.Radiobutton(checkbox_frame, text=text, 
                variable=self.var, value=value)
            b.pack(side='left', ipadx=10, ipady=2)

        enter_button = ttk.Button(self, text="Next Question", command=self.nextQuestion)
        enter_button.pack(ipady=5, pady=20)

    def nextQuestion(self):
        '''
        When button is clicked, add user's input to a list
        and display next question.
        '''
        answer = self.var.get()

        if answer == '0':
            dialogBox("No Value Given", 
                "You did not select an answer.\nPlease try again.")
        else:
            selected_answer = self.var.get()
            general_answers_list.append(selected_answer)

            time.sleep(.2) # delay between questions

            self.controller.show_frame(SalaryQuestion)

class SalaryQuestion(Frame):
    """
    Displays salary question from General questions.
    """
    def __init__(self, master, controller):
        Frame.__init__(self, master)
        self.controller = controller

        global general_answers_list

        # Create header label
        ttk.Label(self, text="????????????", font=('Verdana', 20), 
                  borderwidth=2, relief="ridge").pack(padx=10, pady=10)

        self.question = "???????????????"

        # Set up labels and listbox
        self.question_label = Label(self, text="6. {}".format(self.question), font=('Verdana', 16))
        self.question_label.pack(anchor='w', padx=20, pady=10)
        Label(self, text="??????????????????????????????", font=('Verdana', 10)).pack(padx=50)

        choices = ["5000??????", "5000??????1?????????", "1?????????1???5000??????",
                 "1???5000??????2?????????", "2?????????2???5000??????",  "2???5000??????"]

        self.lb_choices = Listbox(self, selectmode=BROWSE, width=20, borderwidth=3, relief="ridge")
        self.lb_choices.pack(ipady=5, ipadx=5)

        for ch in choices:
            self.lb_choices.insert(END, ch)

        enter_button = ttk.Button(self, text="Next Question", command=self.nextQuestion)
        enter_button.pack(ipady=5, pady=20)

    def nextQuestion(self):
        '''
        When button is clicked, add user's input to a list
        and display next question.
        '''
        selection = self.lb_choices.curselection()        

        if len(selection) == 0:
            dialogBox("No Value Given", 
                "You did not select an answer.\nPlease try again.")
        else:
            get_selection = self.lb_choices.get(selection)
            general_answers_list.append(get_selection)

            time.sleep(.2) # delay between questions

            self.controller.show_frame(RelationQuestion)

class RelationQuestion(Frame):
    """
    Displays relationship with people attending question from General questions.
    """
    def __init__(self, master, controller):
        Frame.__init__(self, master)
        self.controller = controller

        global general_answers_list

        # Create header label
        ttk.Label(self, text="????????????", font=('Verdana', 20), 
                  borderwidth=2, relief="ridge").pack(padx=10, pady=10)

        self.question = "???????????????????????????????????????????????????? "

        # Set up labels and checkboxes 
        self.question_label = Label(self, text="7. {}".format(self.question), font=('Verdana', 16))
        self.question_label.pack(anchor='w', padx=20, pady=10)
        Label(self, text="??????????????????????????????", font=('Verdana', 10)).pack(padx=50)

        scale = [("??????", "??????"), ("??????", "??????"), ("????????????", "????????????"),
                 ("??????", "??????"), ("????????????????????????", "????????????????????????"), 
                 ("??????", "??????")]

        self.var = StringVar()
        self.var.set(0) # initialize

        # Frame to contain checkboxes
        checkbox_frame = Frame(self, borderwidth=2, relief="ridge")
        checkbox_frame.pack(pady=10, anchor='center')

        for text, value in scale:
            b = ttk.Radiobutton(checkbox_frame, text=text, 
                variable=self.var, value=value)
            b.pack(side='left', ipadx=8, ipady=2)

        self.enter_button = ttk.Button(self, text="Next Question", command=self.nextQuestion)
        self.enter_button.pack(ipady=5, pady=20)

    def nextQuestion(self):
        '''
        When button is clicked, add user's input to a list
        and display next question.
        '''
        answer = self.var.get()

        if answer == '0':
            dialogBox("No Value Given", 
                "You did not select an answer.\nPlease try again.")
        elif  answer == '??????':
            self.other_window = otherPopUpDialog(self.master, text="Other Relations:")
            self.enter_button["state"] = "disabled"
            self.master.wait_window(self.other_window.top)
            self.enter_button["state"] = "normal"

            get_other = self.other_window.value
            general_answers_list.append(get_other)

            time.sleep(.2) # delay between questions

            self.controller.show_frame(TimeQuestion)
        else:
            selected_answer = self.var.get()
            general_answers_list.append(selected_answer)

            time.sleep(.2) # delay between questions

            self.controller.show_frame(TimeQuestion)

class TimeQuestion(Frame):
    """
    Displays how long person attended game question from General questions.
    """
    def __init__(self, master, controller):
        Frame.__init__(self, master)
        self.controller = controller

        global general_answers_list

        # Create header label
        ttk.Label(self, text="????????????", font=('Verdana', 20), 
                  borderwidth=2, relief="ridge").pack(padx=10, pady=10)

        self.question = "??????????????????????????????????"

        # Set up labels and listbox 
        self.question_label = Label(self, text="8. {}".format(self.question), font=('Verdana', 16))
        self.question_label.pack(anchor='w', padx=20, pady=10)
        Label(self, text="??????????????????????????????", font=('Verdana', 10)).pack(padx=50)

        choices = ["30????????????", "30?????? 60??????", "60??????", "90??????",
        "90????????????", "120????????????", "120????????????"]

        self.lb_choices = Listbox(self, selectmode=BROWSE, width=20, borderwidth=3, relief="ridge")
        self.lb_choices.pack(ipady=5, ipadx=5)

        for ch in choices:
            self.lb_choices.insert(END, ch)

        enter_button = ttk.Button(self, text="Next Question", command=self.nextQuestion)
        enter_button.pack(ipady=5, pady=20)

    def nextQuestion(self):
        '''
        When button is clicked, add user's input to a list
        and display next question.
        '''
        selection = self.lb_choices.curselection()        

        if len(selection) == 0:
            dialogBox("No Value Given", 
                "You did not select an answer.\nPlease try again.")
        else:
            get_selection = self.lb_choices.get(selection)
            general_answers_list.append(get_selection)

            time.sleep(.2) # delay between questions

            self.controller.show_frame(TransitQuestion)

class TransitQuestion(Frame):
    """
    Displays transportation question from General questions.
    """
    def __init__(self, master, controller):
        Frame.__init__(self, master)
        self.controller = controller

        global general_answers_list

        # Create header label
        ttk.Label(self, text="????????????", font=('Verdana', 20), 
                  borderwidth=2, relief="ridge").pack(padx=10, pady=10)

        self.question = "?????????????????????????????????????????????????"

        self.question_label = Label(self, text="9. {}".format(self.question), font=('Verdana', 16))
        self.question_label.pack(anchor='w', padx=20, pady=10)
        Label(self, text="??????????????????????????????", font=('Verdana', 10)).pack(padx=50)

        # Set up labels and checkboxes 
        scale = [("??????", "??????"), ("??????", "??????"), ("?????????", "?????????"),
                 ("?????????", "?????????"), ("?????????????????????", "?????????????????????"), 
                 ("??????", "??????")]

        self.var = StringVar()
        self.var.set(0) # initialize

        # Frame to contain checkboxes
        checkbox_frame = Frame(self, borderwidth=2, relief="ridge")
        checkbox_frame.pack(pady=10, anchor='center')

        for text, value in scale:
            b = ttk.Radiobutton(checkbox_frame, text=text, 
                variable=self.var, value=value)
            b.pack(side='left', ipadx=7, ipady=2)

        enter_button = ttk.Button(self, text="Next Question", command=self.nextQuestion)
        enter_button.pack(ipady=5, pady=20)

    def nextQuestion(self):
        '''
        When button is clicked, add user's input to a list
        and display next question.
        '''
        answer = self.var.get()

        if answer == '0':
            dialogBox("No Value Given", 
                "You did not select an answer.\nPlease try again.")
        else:
            selected_answer = self.var.get()
            general_answers_list.append(selected_answer)

            time.sleep(.2) # delay between questions

            self.controller.show_frame(ExpensesQuestion)

class ExpensesQuestion(Frame):
    """
    Displays expenses at game question from General questions.
    """
    def __init__(self, master, controller):
        Frame.__init__(self, master)
        self.controller = controller

        global general_answers_list

        # Create header label
        ttk.Label(self, text="????????????", font=('Verdana', 20), 
                  borderwidth=2, relief="ridge").pack(padx=10, pady=10)

        self.question = "??????????????????????????????????????????,?????????????????????,??????????????????????"

        # Set up labels and listbox
        self.question_label = Label(self, text="10. {}".format(self.question), font=('Verdana', 16))
        self.question_label.pack(anchor='w', padx=20, pady=10)
        Label(self, text="??????????????????????????????", font=('Verdana', 10)).pack(padx=50)

        choices = ["30?????????", "30??? - 60???", "60??? - 100???", 
                   "100??? - 150???", "150??? - 180???", "180??? - 200???",
                   "200??? - 230???", "230?????????"] 

        self.lb_choices = Listbox(self, selectmode=BROWSE, width=20, borderwidth=3, relief="ridge")
        self.lb_choices.pack(ipady=5, ipadx=5)

        for ch in choices:
            self.lb_choices.insert(END, ch)

        enter_button = ttk.Button(self, text="Next Question", command=self.nextQuestion)
        enter_button.pack(ipady=5, pady=20)

    def nextQuestion(self):
        '''
        When button is clicked, add user's input to a list
        and display next question.
        '''
        selection = self.lb_choices.curselection()        

        if len(selection) == 0:
            dialogBox("No Value Given", 
                "You did not select an answer.\nPlease try again.")
        else:
            get_selection = self.lb_choices.get(selection)
            general_answers_list.append(get_selection)

            time.sleep(.2) # delay between questions

            self.writeToFile()
            finished_text = "You have reached the end of the survey.\nThank you for your participation and your time.\n"
            finishedDialog("Finished Survey", finished_text)

    def writeToFile(self):
        """
        When user selects finished button, writes each filename with corresponding 
        answer list to separate files.
        """
        # list of names and answer lists
        filenames = ['01_lifestyle_answers.csv', '02_sig_trends_answers.csv', 
                     '03_future_trends_answers.csv', '04_general_answers.csv']

        answers_lists = [lifestyle_list, sig_trends_list, 
                         future_trends_list, general_answers_list]

        for filename, answers in zip(filenames, answers_lists):
            writeToFile(filename, answers)

# Run program
if __name__ == "__main__":
    app = Survey()
    app.mainloop()