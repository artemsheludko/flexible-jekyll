all: build serve

build:
	bundler exec jekyll build --trace
serve:
	bundler exec jekyll serve
clean:
	bundler exec jekyll clean
scss:
	scss assets/css/scss/main.css assets/css/main.css

# EOF
