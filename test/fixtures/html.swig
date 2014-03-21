<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Test page</title>
    <link rel="stylesheet" href="http://yandex.st/highlightjs/8.0/styles/default.min.css">
</head>
<body>

<h1>This is a test!</h1>

{% highlight 'bash' %}
#!/bin/bash
# guake-start.sh
guake --rename-tab="home" &
sleep 3
guake --new-tab=2 --rename-tab="projects" --execute-command="cd ~/projects" &
sleep 1
guake --new-tab=3 --rename-tab="develop" --execute-command="cd ~/projects" &
sleep 1
guake --new-tab=4 --rename-tab="git" --execute-command="cd ~/projects" &
sleep 1
guake --new-tab=5 --rename-tab="sudo" &
sleep 1
guake --new-tab=6 --rename-tab="optional" &
{% endhighlight %}

</body>
</html>
