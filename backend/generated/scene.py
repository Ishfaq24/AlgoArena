from manim import *

class DemoScene(Scene):
    def construct(self):
        title = Text("Binary Search Explained", font_size=40)
        title.to_edge(UP)
        self.play(Write(title))
        self.wait(1)

        intro1 = Text("Efficiently find an item", font_size=28)
        intro1.next_to(title, DOWN, buff=0.5)
        self.play(Write(intro1))
        self.wait(1)

        intro2 = Text("Requirement: Sorted Array", font_size=28, color=YELLOW)
        intro2.next_to(intro1, DOWN, buff=0.5)
        self.play(Write(intro2))
        self.wait(2)

        self.play(FadeOut(*self.mobjects))

        header = Text("Step-by-Step Process", font_size=32)
        header.to_edge(UP)
        self.play(Write(header))

        values = [10, 20, 30, 40, 50, 60, 70, 80, 90]
        boxes = VGroup(*[Rectangle(width=0.8, height=0.8) for _ in values])
        boxes.arrange(RIGHT, buff=0.1).shift(UP*0.5)

        labels = VGroup(*[Text(str(v), font_size=24).move_to(boxes[i]) for i, v in enumerate(values)])

        array_group = VGroup(boxes, labels)
        self.play(Create(boxes), Write(labels))
        self.wait(1)

        target_text = Text("Target: 70", font_size=28, color=GREEN)
        target_text.next_to(array_group, DOWN, buff=0.8)
        self.play(Write(target_text))
        self.wait(1)

        low_ptr = Arrow(start=DOWN*2, end=boxes[0].get_bottom(), color=BLUE)
        low_label = Text("Low", font_size=20, color=BLUE).next_to(low_ptr, DOWN)
        self.play(Create(low_ptr), Write(low_label))

        high_ptr = Arrow(start=DOWN*2, end=boxes[-1].get_bottom(), color=RED)
        high_label = Text("High", font_size=20, color=RED).next_to(high_ptr, DOWN)
        self.play(Create(high_ptr), Write(high_label))
        self.wait(1)

        mid_idx = 4
        mid_ptr = Arrow(start=DOWN*2, end=boxes[mid_idx].get_bottom(), color=YELLOW)
        mid_label = Text("Mid", font_size=20, color=YELLOW).next_to(mid_ptr, DOWN)

        self.play(Create(mid_ptr), Write(mid_label))
        mid_box = SurroundingRectangle(boxes[mid_idx], color=YELLOW)
        self.play(Create(mid_box))
        self.wait(1)

        logic1 = Text("50 < 70: Move Low to Mid+1", font_size=24)
        logic1.next_to(target_text, DOWN, buff=0.5)
        self.play(Write(logic1))
        self.wait(2)

        self.play(FadeOut(mid_ptr), FadeOut(mid_label), FadeOut(mid_box), FadeOut(logic1))

        self.play(low_ptr.animate.next_to(boxes[mid_idx+1], DOWN, buff=0),
                  low_label.animate.next_to(boxes[mid_idx+1], DOWN, buff=0.2))
        self.wait(1)

        mid_idx_2 = 6
        mid_ptr_2 = Arrow(start=DOWN*2, end=boxes[mid_idx_2].get_bottom(), color=YELLOW)
        mid_label_2 = Text("Mid", font_size=20, color=YELLOW).next_to(mid_ptr_2, DOWN)

        self.play(Create(mid_ptr_2), Write(mid_label_2))
        mid_box_2 = SurroundingRectangle(boxes[mid_idx_2], color=YELLOW)
        self.play(Create(mid_box_2))
        self.wait(1)

        logic2 = Text("70 == 70: Found!", font_size=24, color=GREEN)
        logic2.next_to(target_text, DOWN, buff=0.5)
        self.play(Write(logic2))
        self.wait(2)

        self.play(FadeOut(*self.mobjects))

        summary_title = Text("Complexity Summary", font_size=32)
        summary_title.to_edge(UP)
        self.play(Write(summary_title))

        time_comp = Text("Time Complexity: O(log n)", font_size=28)
        time_comp.next_to(summary_title, DOWN, buff=0.8)
        self.play(Write(time_comp))
        self.wait(1)

        space_comp = Text("Space Complexity: O(1)", font_size=28)
        space_comp.next_to(time_comp, DOWN, buff=0.5)
        self.play(Write(space_comp))
        self.wait(1)

        conclusion = Text("Divide and Conquer Strategy", font_size=24, color=YELLOW)
        conclusion.next_to(space_comp, DOWN, buff=0.8)
        self.play(Write(conclusion))
        self.wait(3)