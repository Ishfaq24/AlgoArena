from manim import *

class DemoScene(Scene):
    def construct(self):
        # Title Slide
        title = Text("What is a Compiler?", font_size=40, color=WHITE)
        title.to_edge(UP)
        self.play(FadeIn(title))
        self.wait(1)

        # Background rectangle for title
        bg_rect = Rectangle(width=title.width + 0.5, height=title.height + 0.5, color="#1a1a2e", fill_opacity=1)
        bg_rect.move_to(title.get_center())
        self.play(DrawBorderThenFill(bg_rect))
        self.wait(1)

        self.play(FadeOut(bg_rect), FadeOut(title))

        # Animated Intro
        intro_text = VGroup(
            Text("Compilers are essential tools in programming.", font_size=28, color=LIGHT_GRAY),
            Text("They translate high-level code into machine code.", font_size=28, color=LIGHT_GRAY)
        ).arrange(DOWN, buff=0.3).to_edge(UP)

        self.play(FadeIn(intro_text))
        self.wait(2)

        # Clear the screen
        self.play(FadeOut(intro_text))

        # Define and show key components
        definition = Text("Definition:", font_size=32, color=GOLD).to_edge(UP)
        self.play(FadeIn(definition))
        self.wait(1)

        compiler_text = Text("A Compiler is a program that converts source code", font_size=28, color=LIGHT_GRAY)
        compiler_text.next_to(definition, DOWN, buff=0.5)
        self.play(FadeIn(compiler_text))
        self.wait(2)

        # Highlight important term "source code"
        box = SurroundingRectangle(compiler_text, color="#00FFFF")
        self.play(Create(box))
        self.wait(1)

        # Further explanation
        explanation = Text("into machine code, making it executable.", font_size=28, color=LIGHT_GRAY)
        explanation.next_to(compiler_text, DOWN, buff=0.3)
        self.play(FadeIn(explanation))
        self.wait(2)
        self.play(FadeOut(box))

        # Clear the screen
        self.play(FadeOut(compiler_text), FadeOut(explanation), FadeOut(definition))

        # Components of a Compiler
        components_title = Text("Components of a Compiler", font_size=32, color=GOLD).to_edge(UP)
        self.play(FadeIn(components_title))
        self.wait(1)

        components_list = VGroup(
            Text("1. Lexical Analyzer", font_size=28, color=LIGHT_GRAY),
            Text("2. Syntax Analyzer", font_size=28, color=LIGHT_GRAY),
            Text("3. Semantic Analyzer", font_size=28, color=LIGHT_GRAY),
            Text("4. Optimizer", font_size=28, color=LIGHT_GRAY),
            Text("5. Code Generator", font_size=28, color=LIGHT_GRAY)
        )
        components_list.arrange(DOWN, aligned_edge=LEFT, buff=0.4).next_to(components_title, DOWN, buff=0.5)
        self.play(FadeIn(components_list))
        self.wait(2)

        # Clear the screen
        self.play(FadeOut(components_list), FadeOut(components_title))

        # Key Takeaway
        takeaway = Text("Key Takeaway:", font_size=32, color=GOLD).to_edge(UP)
        self.play(FadeIn(takeaway))
        self.wait(1)

        takeaway_text = Text("Compilers bridge the gap between human language and machine language.", font_size=28, color=LIGHT_GRAY)
        takeaway_text.next_to(takeaway, DOWN, buff=0.5)
        self.play(FadeIn(takeaway_text))
        self.wait(2)

        # Closing
        self.play(FadeOut(takeaway), FadeOut(takeaway_text))
        closing = Text("Thank you for watching!", font_size=36, color="#FF6B6B").to_edge(UP)
        self.play(FadeIn(closing))
        self.wait(2)
        self.play(FadeOut(closing))