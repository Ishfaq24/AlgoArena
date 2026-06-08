from manim import *

class DemoScene(Scene):
    def construct(self):
        self.camera.background_color = "#0a0a0a"

        # 1. Title Introduction
        title = Text('explain machine learning in detail', font_size=40, color=BLUE)
        title.to_edge(UP)
        self.play(Write(title), run_time=1.5)
        self.wait(0.5)

        line = Line(LEFT*2.5, RIGHT*2.5, color=BLUE)
        line.next_to(title, DOWN*0.3)
        self.play(Create(line))
        self.wait(0.5)

        # 2. Concept Breakdown
        concept = Text('Understanding the core idea', font_size=24, color=GREY_B)
        concept.next_to(line, DOWN, buff=0.5)
        self.play(FadeIn(concept))
        self.wait(1)

        box = SurroundingRectangle(concept, color=YELLOW)
        self.play(Create(box))
        self.wait(1)

        # 3. Stacked List using VGroup and arrange()
        step1 = Text('Step 1: Basics', font_size=24, color=RED)
        step2 = Text('Step 2: Process', font_size=24, color=BLUE)
        step3 = Text('Step 3: Result', font_size=24, color=GREEN)

        group = VGroup(step1, step2, step3).arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        group.next_to(concept, DOWN, buff=1.0)
        
        self.play(FadeIn(group))
        self.wait(2)

        # 4. Clear Screen before next scene
        self.play(FadeOut(*self.mobjects))
        self.wait(0.5)