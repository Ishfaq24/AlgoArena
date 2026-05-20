from manim import *

class DemoScene(Scene):
    def construct(self):
        self.camera.background_color = "#0a0a1a"

        # --- SECTION 1: TITLE SLIDE ---
        title = Text("Understanding Transformers", font_size=40, color="#00FFFF").shift(UP * 0.5)
        subtitle = Text("The Architecture of Modern AI", font_size=24, color=LIGHT_GRAY).next_to(title, DOWN, buff=0.5)

        line = Line(LEFT, RIGHT, color=GOLD).scale(3).next_to(subtitle, DOWN, buff=0.7)

        self.play(Write(title), run_time=1.2)
        self.play(FadeIn(subtitle, shift=UP * 0.3), run_time=1)
        self.play(Create(line), run_time=1)
        self.wait(2)
        self.play(FadeOut(title), FadeOut(subtitle), FadeOut(line))

        # --- SECTION 2: THE CORE PROBLEM ---
        prob_title = Text("The Limitation of RNNs", font_size=32, color=GOLD).to_edge(UP)
        self.play(Write(prob_title))

        rnn_box = Rectangle(width=3, height=1, color=WHITE).shift(LEFT * 3)
        rnn_text = Text("Sequential Processing", font_size=20).move_to(rnn_box.get_center())
        rnn_group = VGroup(rnn_box, rnn_text)

        arrow = Arrow(rnn_group.get_right(), rnn_group.get_right() + RIGHT * 2, color=GRAY)

        bottleneck = Text("Information Loss", font_size=24, color=RED).next_to(arrow, RIGHT)

        self.play(DrawBorderThenFill(rnn_box), Write(rnn_text))
        self.play(GrowArrow(arrow))
        self.play(Write(bottleneck))
        self.wait(1.5)

        solution_text = Text("The Solution: Attention", font_size=28, color="#00FFFF").next_to(bottleneck, DOWN, buff=1)
        self.play(Write(solution_text))
        self.play(Indicate(solution_text))
        self.wait(2)
        self.play(FadeOut(*self.mobjects))

        # --- SECTION 3: SELF-ATTENTION VISUALIZATION ---
        att_title = Text("Self-Attention Mechanism", font_size=32, color="#00FFFF").to_edge(UP)
        self.play(Write(att_title))

        # Input words
        words = ["The", "cat", "sat", "on", "the", "mat"]
        word_objs = VGroup()
        for w in words:
            t = Text(w, font_size=24, color=WHITE)
            word_objs.add(t)

        word_objs.arrange(RIGHT, buff=0.8).shift(UP * 1)
        self.play(Write(word_objs))

        # Focus on 'sat' (index 2)
        target_word = word_objs[2]
        box = SurroundingRectangle(target_word, color=GOLD, buff=0.1)
        self.play(Create(box))

        # Connection lines to other words
        connections = VGroup()
        for i in range(len(word_objs)):
            line = Line(target_word.get_center(), word_objs[i].get_center(),
                        stroke_width=2, color=BLUE_A).set_opacity(0.5)
            connections.add(line)

        self.play(Create(connections), run_time=1.5)

        # Highlight specific relation (sat -> cat)
        highlight_line = Line(target_word.get_center(), word_objs[1].get_center(),
                             stroke_width=4, color=GOLD)
        self.play(Create(highlight_line))

        expl_text = Text("Computing relationships between all words", font_size=22, color=LIGHT_GRAY).next_to(word_objs, DOWN, buff=1.5)
        self.play(Write(expl_text))
        self.wait(2)
        self.play(FadeOut(*self.mobjects))

        # --- SECTION 4: QKV ARCHITECTURE ---
        arch_title = Text("The QKV Framework", font_size=32, color=GOLD).to_edge(UP)
        self.play(Write(arch_title))

        # Creating 3 colored boxes for Q, K, V
        q_box = Rectangle(width=2, height=1, color="#00FFFF").shift(LEFT * 3 + UP * 0.5)
        q_text = Text("Query (Q)", font_size=24).move_to(q_box.get_center())

        k_box = Rectangle(width=2, height=1, color=GREEN).shift(LEFT * 0 + UP * 0.5)
        k_text = Text("Key (K)", font_size=24).move_to(k_box.get_center())

        v_box = Rectangle(width=2, height=1, color=RED).shift(RIGHT * 3 + UP * 0.5)
        v_text = Text("Value (V)", font_size=24).move_to(v_box.get_center())

        q_grp = VGroup(q_box, q_text)
        k_grp = VGroup(k_box, k_text)
        v_grp = VGroup(v_box, v_text)

        self.play(FadeIn(q_grp), FadeIn(k_grp), FadeIn(v_grp))

        # Interaction Arrows
        arr1 = Arrow(q_box.get_bottom(), k_box.get_bottom(), color=WHITE).shift(DOWN * 0.5)
        label1 = Text("Dot Product", font_size=18, color=LIGHT_GRAY).next_to(arr1, DOWN)

        arr2 = Arrow(k_box.get_bottom(), v_box.get_bottom(), color=WHITE).shift(DOWN * 0.5)
        label2 = Text("Weighted Sum", font_size=18, color=LIGHT_GRAY).next_to(arr2, DOWN)

        self.play(GrowArrow(arr1), Write(label1))
        self.play(GrowArrow(arr2), Write(label2))
        self.wait(2)
        self.play(FadeOut(*self.mobjects))

        # --- SECTION 5: THE FULL ARCHITECTURE ---
        final_title = Text("Transformer Architecture", font_size=32, color="#00FFFF").to_edge(UP)
        self.play(Write(final_title))

        # Simplified Blocks
        enc_block = Rectangle(width=3, height=4, color=BLUE_B).shift(LEFT * 3)
        enc_text = Text("Encoder", font_size=24, color=BLUE_B).next_to(enc_block, UP)

        dec_block = Rectangle(width=3, height=4, color=RED_B).shift(RIGHT * 3)
        dec_text = Text("Decoder", font_size=24, color=RED_B).next_to(dec_block, UP)

        bridge = Arrow(enc_block.get_right(), dec_block.get_left(), color=GOLD)
        bridge_text = Text("Context Vector", font_size=20).next_to(bridge, UP)

        self.play(DrawBorderThenFill(enc_block), Write(enc_text))
        self.play(DrawBorderThenFill(dec_block), Write(dec_text))
        self.play(GrowArrow(bridge), Write(bridge_text))

        # Final Summary Points
        points = VGroup(
            Text("• Parallel Processing", font_size=22),
            Text("• Global Context", font_size=22),
            Text("• Scalable Architecture", font_size=22)
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).next_to(bridge, DOWN, buff=1)

        for p in points:
            self.play(Write(p), run_time=0.8)

        self.wait(2)
        self.play(FadeOut(*self.mobjects))

        # --- SECTION 6: CLOSING ---
        closing_text = Text("The Foundation of LLMs", font_size=36, color=GOLD)
        sub_closing = Text("GPT, BERT, T5 and beyond", font_size=24, color=LIGHT_GRAY).next_to(closing_text, DOWN)

        self.play(Write(closing_text))
        self.play(FadeIn(sub_closing, shift=UP * 0.2))
        self.wait(3)
        self.play(ShrinkToCenter(closing_text), ShrinkToCenter(sub_closing))
        self.wait(1)