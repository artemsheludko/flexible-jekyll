# coding: utf-8
task :default => :preview

desc 'Preview on local machine'
task :preview do
  sh 'bundle exec jekyll serve'
end
task :serve => :preview

desc 'Build the site for deployment'
task :build => :clean do 
    sh 'bundle exec jekyll build'
end

desc 'Destroy the generated site'
desc 'Clean up generated site'
task :clean do
    sh 'rm -rf _site'
end