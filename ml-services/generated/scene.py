from manim import *

class DemoScene(Scene):
    def construct(self):
        title = Text("Understanding the Backend", font_size=40)
        self.play(Write(title))
        self.wait(2)
        self.play(FadeOut(title))

        client = Rectangle(height=2, width=3, color=BLUE)
        client_text = Text("Client (Browser)", font_size=28).move_to(client.get_center())
        client_group = VGroup(client, client_text).shift(LEFT * 4)

        self.play(Create(client), Write(client_text))
        self.wait(1)

        server = Rectangle(height=2, width=3, color=GREEN)
        server_text = Text("Backend (Server)", font_size=28).move_to(server.get_center())
        server_group = VGroup(server, server_text).shift(RIGHT * 4)

        self.play(Create(server), Write(server_text))
        self.wait(1)

        req_arrow = Arrow(client.get_right(), server.get_left(), color=WHITE)
        req_label = Text("HTTP Request", font_size=20).next_to(req_arrow, UP, buff=0.1)

        self.play(GrowArrow(req_arrow), Write(req_label))
        self.wait(1)

        res_arrow = Arrow(server.get_left(), client.get_right(), color=YELLOW).shift(DOWN * 0.5)
        res_label = Text("HTTP Response", font_size=20).next_to(res_arrow, DOWN, buff=0.1)

        self.play(GrowArrow(res_arrow), Write(res_label))
        self.wait(2)
        self.play(FadeOut(*self.mobjects))

        backend_title = Text("The Backend Components", font_size=40)
        backend_title.to_edge(UP)
        self.play(Write(backend_title))
        self.wait(1)

        comp1 = Text("1. Server", font_size=28)
        comp1.next_to(backend_title, DOWN, buff=1)
        self.play(Write(comp1))
        self.wait(1)

        comp2 = Text("2. Application Logic", font_size=28)
        comp2.next_to(comp1, DOWN, buff=0.5)
        self.play(Write(comp2))
        self.wait(1)

        comp3 = Text("3. Database", font_size=28)
        comp3.next_to(comp2, DOWN, buff=0.5)
        self.play(Write(comp3))
        self.wait(1)

        box = SurroundingRectangle(comp2, color=YELLOW)
        self.play(Create(box))
        self.wait(2)
        self.play(FadeOut(*self.mobjects))

        db_box = Rectangle(height=1.5, width=3, color=RED)
        db_text = Text("Database", font_size=28).move_to(db_box.get_center())
        db_group = VGroup(db_box, db_text).shift(UP * 1)

        self.play(Create(db_box), Write(db_text))
        self.wait(1)

        logic_box = Rectangle(height=1.5, width=3, color=PURPLE)
        logic_text = Text("App Logic (Python/Node)", font_size=28).move_to(logic_box.get_center())
        logic_group = VGroup(logic_box, logic_text).next_to(db_group, DOWN, buff=1)

        self.play(Create(logic_box), Write(logic_text))
        self.wait(1)

        query_arrow = Arrow(logic_box.get_top(), db_box.get_bottom(), color=WHITE)
        query_text = Text("Query", font_size=20).next_to(query_arrow, RIGHT, buff=0.1)

        self.play(GrowArrow(query_arrow), Write(query_text))
        self.wait(1)

        data_arrow = Arrow(db_box.get_bottom(), logic_box.get_top(), color=YELLOW).shift(LEFT * 0.5)
        data_text = Text("Data", font_size=20).next_to(data_arrow, LEFT, buff=0.1)

        self.play(GrowArrow(data_arrow), Write(data_text))
        self.wait(2)
        self.play(FadeOut(*self.mobjects))

        summary = Text("Backend = Server + Logic + DB", font_size=32)
        self.play(Write(summary))
        self.wait(2)
        self.play(FadeOut(summary))