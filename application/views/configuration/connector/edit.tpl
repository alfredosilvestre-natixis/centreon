{extends file="../../viewLayout.tpl"}

{block name="title"}Connector{/block}

{block name="content"}
    <div class="container">
        <div class="row">
            <form class="form-horizontal" role="form" {$form.attributes}>
                {$form.name.html}
                {$form.description.html}
                {$form.command_line.html}
                {$form.status.html}
                {$form.hidden}
                {$form.save_form.html}
            </form>
        </div>
    </div>
{/block}
