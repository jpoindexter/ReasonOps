<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* @Installation/_systemCheckSection.twig */
class __TwigTemplate_6a3ae56e62a271c796be07947af9d907 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        $macros["local"] = $this->macros["local"] = $this;
        // line 18
        yield "<details>
<summary>Click to view System Check</summary>

### Mandatory checks
";
        // line 22
        yield CoreExtension::callMacro($macros["local"], "macro_diagnosticInfo", [CoreExtension::getAttribute($this->env, $this->source, (isset($context["diagnosticReport"]) || array_key_exists("diagnosticReport", $context) ? $context["diagnosticReport"] : (function () { throw new RuntimeError('Variable "diagnosticReport" does not exist.', 22, $this->source); })()), "getMandatoryDiagnosticResults", [], "method", false, false, false, 22)], 22, $context, $this->getSourceContext());
        yield "

### Optional checks
";
        // line 25
        yield CoreExtension::callMacro($macros["local"], "macro_diagnosticInfo", [CoreExtension::getAttribute($this->env, $this->source, (isset($context["diagnosticReport"]) || array_key_exists("diagnosticReport", $context) ? $context["diagnosticReport"] : (function () { throw new RuntimeError('Variable "diagnosticReport" does not exist.', 25, $this->source); })()), "getOptionalDiagnosticResults", [], "method", false, false, false, 25)], 25, $context, $this->getSourceContext());
        yield "

### Informational results
";
        // line 28
        yield CoreExtension::callMacro($macros["local"], "macro_diagnosticInfo", [CoreExtension::getAttribute($this->env, $this->source, (isset($context["diagnosticReport"]) || array_key_exists("diagnosticReport", $context) ? $context["diagnosticReport"] : (function () { throw new RuntimeError('Variable "diagnosticReport" does not exist.', 28, $this->source); })()), "getInformationalResults", [], "method", false, false, false, 28)], 28, $context, $this->getSourceContext());
        yield "
</details>";
        return; yield '';
    }

    // line 2
    public function macro_diagnosticInfo($__results__ = null, ...$__varargs__)
    {
        $macros = $this->macros;
        $context = $this->env->mergeGlobals([
            "results" => $__results__,
            "varargs" => $__varargs__,
        ]);

        $blocks = [];

        return ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
            // line 3
            $context["error"] = Twig\Extension\CoreExtension::constant("Piwik\\Plugins\\Diagnostics\\Diagnostic\\DiagnosticResult::STATUS_ERROR");
            // line 4
            $context["warning"] = Twig\Extension\CoreExtension::constant("Piwik\\Plugins\\Diagnostics\\Diagnostic\\DiagnosticResult::STATUS_WARNING");
            // line 5
            $context["informational"] = Twig\Extension\CoreExtension::constant("Piwik\\Plugins\\Diagnostics\\Diagnostic\\DiagnosticResult::STATUS_INFORMATIONAL");
            // line 6
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable((isset($context["results"]) || array_key_exists("results", $context) ? $context["results"] : (function () { throw new RuntimeError('Variable "results" does not exist.', 6, $this->source); })()));
            foreach ($context['_seq'] as $context["_key"] => $context["result"]) {
                // line 7
                yield "
#### ";
                // line 8
                yield $this->env->getFilter('rawSafeDecoded')->getCallable()(CoreExtension::getAttribute($this->env, $this->source, $context["result"], "label", [], "any", false, false, false, 8));
                yield ":
";
                // line 9
                $context['_parent'] = $context;
                $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, $context["result"], "items", [], "any", false, false, false, 9));
                foreach ($context['_seq'] as $context["_key"] => $context["item"]) {
                    // line 10
                    if ((CoreExtension::getAttribute($this->env, $this->source, $context["item"], "status", [], "any", false, false, false, 10) == (isset($context["error"]) || array_key_exists("error", $context) ? $context["error"] : (function () { throw new RuntimeError('Variable "error" does not exist.', 10, $this->source); })()))) {
                        yield "&#9888; Error: ";
                        yield \Piwik\piwik_escape_filter($this->env, Twig\Extension\CoreExtension::striptags($this->env->getFilter('anonymiseSystemInfo')->getCallable()(CoreExtension::getAttribute($this->env, $this->source, $context["item"], "comment", [], "any", false, false, false, 10)), "<br><p><strong><code>"), "html", null, true);
                    } elseif ((CoreExtension::getAttribute($this->env, $this->source, $context["item"], "status", [], "any", false, false, false, 10) == (isset($context["warning"]) || array_key_exists("warning", $context) ? $context["warning"] : (function () { throw new RuntimeError('Variable "warning" does not exist.', 10, $this->source); })()))) {
                        yield " &#9888; Warning: ";
                        yield \Piwik\piwik_escape_filter($this->env, Twig\Extension\CoreExtension::striptags($this->env->getFilter('anonymiseSystemInfo')->getCallable()(CoreExtension::getAttribute($this->env, $this->source, $context["item"], "comment", [], "any", false, false, false, 10)), "<br><p><strong><code>"), "html", null, true);
                    } elseif ((CoreExtension::getAttribute($this->env, $this->source, $context["item"], "status", [], "any", false, false, false, 10) == (isset($context["informational"]) || array_key_exists("informational", $context) ? $context["informational"] : (function () { throw new RuntimeError('Variable "informational" does not exist.', 10, $this->source); })()))) {
                        yield " ";
                        yield \Piwik\piwik_escape_filter($this->env, Twig\Extension\CoreExtension::striptags($this->env->getFilter('anonymiseSystemInfo')->getCallable()(CoreExtension::getAttribute($this->env, $this->source, $context["item"], "comment", [], "any", false, false, false, 10)), "<br><p><strong><code>"), "html", null, true);
                    } else {
                        yield " &#10004; ";
                        yield \Piwik\piwik_escape_filter($this->env, Twig\Extension\CoreExtension::striptags($this->env->getFilter('anonymiseSystemInfo')->getCallable()(CoreExtension::getAttribute($this->env, $this->source, $context["item"], "comment", [], "any", false, false, false, 10)), "<br><p><strong><code>"), "html", null, true);
                    }
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['item'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 12
                yield "
";
                // line 13
                if (CoreExtension::getAttribute($this->env, $this->source, $context["result"], "longErrorMessage", [], "any", false, false, false, 13)) {
                    // line 14
                    yield \Piwik\piwik_escape_filter($this->env, Twig\Extension\CoreExtension::striptags(CoreExtension::getAttribute($this->env, $this->source, $context["result"], "longErrorMessage", [], "any", false, false, false, 14), "<br><p><strong><code>"), "html", null, true);
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['result'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            return; yield '';
        })())) ? '' : new Markup($tmp, $this->env->getCharset());
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "@Installation/_systemCheckSection.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  121 => 14,  119 => 13,  116 => 12,  98 => 10,  94 => 9,  90 => 8,  87 => 7,  83 => 6,  81 => 5,  79 => 4,  77 => 3,  65 => 2,  58 => 28,  52 => 25,  46 => 22,  40 => 18,  38 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("{%- import _self as local -%}
{% macro diagnosticInfo(results) -%}
{% set error = constant('Piwik\\\\Plugins\\\\Diagnostics\\\\Diagnostic\\\\DiagnosticResult::STATUS_ERROR') %}
{% set warning = constant('Piwik\\\\Plugins\\\\Diagnostics\\\\Diagnostic\\\\DiagnosticResult::STATUS_WARNING') %}
{% set informational = constant('Piwik\\\\Plugins\\\\Diagnostics\\\\Diagnostic\\\\DiagnosticResult::STATUS_INFORMATIONAL') %}
{%- for result in results %}

#### {{ result.label|rawSafeDecoded }}:
{% for item in result.items -%}
{%- if item.status == error -%} &#9888; Error: {{ item.comment|anonymiseSystemInfo|striptags('<br><p><strong><code>') }}{% elseif item.status == warning %} &#9888; Warning: {{ item.comment|anonymiseSystemInfo|striptags('<br><p><strong><code>') }}{% elseif item.status == informational %} {{ item.comment|anonymiseSystemInfo|striptags('<br><p><strong><code>') }}{% else %} &#10004; {{ item.comment|anonymiseSystemInfo|striptags('<br><p><strong><code>') }}{% endif -%}
{%- endfor %}

{% if result.longErrorMessage -%}
{{ result.longErrorMessage|striptags('<br><p><strong><code>') }}
{%- endif -%}
    {%- endfor -%}
{%- endmacro -%}
<details>
<summary>Click to view System Check</summary>

### Mandatory checks
{{ local.diagnosticInfo(diagnosticReport.getMandatoryDiagnosticResults()) }}

### Optional checks
{{ local.diagnosticInfo(diagnosticReport.getOptionalDiagnosticResults()) }}

### Informational results
{{ local.diagnosticInfo(diagnosticReport.getInformationalResults()) }}
</details>", "@Installation/_systemCheckSection.twig", "/var/www/html/plugins/Installation/templates/_systemCheckSection.twig");
    }
}
