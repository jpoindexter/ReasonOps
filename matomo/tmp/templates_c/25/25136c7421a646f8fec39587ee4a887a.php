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

/* @Installation/systemCheck.twig */
class __TwigTemplate_cd6105f5b12f4767f75bd24d6e67e075 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->blocks = [
            'content' => [$this, 'block_content'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 1
        return "@Installation/layout.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $this->parent = $this->loadTemplate("@Installation/layout.twig", "@Installation/systemCheck.twig", 1);
        yield from $this->parent->unwrap()->yield($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 4
        yield "
<div
    vue-entry=\"Installation.SystemCheck\"
    show-next-step=\"";
        // line 7
        yield \Piwik\piwik_escape_filter($this->env, json_encode(((array_key_exists("showNextStep", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["showNextStep"]) || array_key_exists("showNextStep", $context) ? $context["showNextStep"] : (function () { throw new RuntimeError('Variable "showNextStep" does not exist.', 7, $this->source); })()), null)) : (null))), "html", null, true);
        yield "\"
    system-check-legend-url=\"";
        // line 8
        yield \Piwik\piwik_escape_filter($this->env, json_encode((isset($context["url"]) || array_key_exists("url", $context) ? $context["url"] : (function () { throw new RuntimeError('Variable "url" does not exist.', 8, $this->source); })())), "html", null, true);
        yield "\"
    error-type=\"";
        // line 9
        yield \Piwik\piwik_escape_filter($this->env, json_encode(Twig\Extension\CoreExtension::constant("Piwik\\Plugins\\Diagnostics\\Diagnostic\\DiagnosticResult::STATUS_ERROR")), "html", null, true);
        yield "\"
    warning-type=\"";
        // line 10
        yield \Piwik\piwik_escape_filter($this->env, json_encode(Twig\Extension\CoreExtension::constant("Piwik\\Plugins\\Diagnostics\\Diagnostic\\DiagnosticResult::STATUS_WARNING")), "html", null, true);
        yield "\"
    informational-type=\"";
        // line 11
        yield \Piwik\piwik_escape_filter($this->env, json_encode(Twig\Extension\CoreExtension::constant("Piwik\\Plugins\\Diagnostics\\Diagnostic\\DiagnosticResult::STATUS_INFORMATIONAL")), "html", null, true);
        yield "\"
    system-check-info=\"";
        // line 12
        yield \Piwik\piwik_escape_filter($this->env, json_encode((isset($context["systemCheckInfo"]) || array_key_exists("systemCheckInfo", $context) ? $context["systemCheckInfo"] : (function () { throw new RuntimeError('Variable "systemCheckInfo" does not exist.', 12, $this->source); })())), "html", null, true);
        yield "\"
    mandatory-results=\"";
        // line 13
        yield \Piwik\piwik_escape_filter($this->env, json_encode(CoreExtension::getAttribute($this->env, $this->source, (isset($context["diagnosticReport"]) || array_key_exists("diagnosticReport", $context) ? $context["diagnosticReport"] : (function () { throw new RuntimeError('Variable "diagnosticReport" does not exist.', 13, $this->source); })()), "getMandatoryDiagnosticResults", [], "method", false, false, false, 13)), "html", null, true);
        yield "\"
    optional-results=\"";
        // line 14
        yield \Piwik\piwik_escape_filter($this->env, json_encode(CoreExtension::getAttribute($this->env, $this->source, (isset($context["diagnosticReport"]) || array_key_exists("diagnosticReport", $context) ? $context["diagnosticReport"] : (function () { throw new RuntimeError('Variable "diagnosticReport" does not exist.', 14, $this->source); })()), "getOptionalDiagnosticResults", [], "method", false, false, false, 14)), "html", null, true);
        yield "\"
    informational-results=\"";
        // line 15
        yield \Piwik\piwik_escape_filter($this->env, json_encode(CoreExtension::getAttribute($this->env, $this->source, (isset($context["diagnosticReport"]) || array_key_exists("diagnosticReport", $context) ? $context["diagnosticReport"] : (function () { throw new RuntimeError('Variable "diagnosticReport" does not exist.', 15, $this->source); })()), "getInformationalResults", [], "method", false, false, false, 15)), "html", null, true);
        yield "\"
    is-installation=\"";
        // line 16
        yield \Piwik\piwik_escape_filter($this->env, json_encode(((array_key_exists("isInstallation", $context)) ? (Twig\Extension\CoreExtension::default((isset($context["isInstallation"]) || array_key_exists("isInstallation", $context) ? $context["isInstallation"] : (function () { throw new RuntimeError('Variable "isInstallation" does not exist.', 16, $this->source); })()), null)) : (null))), "html", null, true);
        yield "\"
></div>

";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "@Installation/systemCheck.twig";
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
        return array (  92 => 16,  88 => 15,  84 => 14,  80 => 13,  76 => 12,  72 => 11,  68 => 10,  64 => 9,  60 => 8,  56 => 7,  51 => 4,  47 => 3,  36 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("{% extends '@Installation/layout.twig' %}

{% block content %}

<div
    vue-entry=\"Installation.SystemCheck\"
    show-next-step=\"{{ showNextStep|default(null)|json_encode }}\"
    system-check-legend-url=\"{{ url|json_encode }}\"
    error-type=\"{{ constant('Piwik\\\\Plugins\\\\Diagnostics\\\\Diagnostic\\\\DiagnosticResult::STATUS_ERROR')|json_encode }}\"
    warning-type=\"{{ constant('Piwik\\\\Plugins\\\\Diagnostics\\\\Diagnostic\\\\DiagnosticResult::STATUS_WARNING')|json_encode }}\"
    informational-type=\"{{ constant('Piwik\\\\Plugins\\\\Diagnostics\\\\Diagnostic\\\\DiagnosticResult::STATUS_INFORMATIONAL')|json_encode }}\"
    system-check-info=\"{{ systemCheckInfo|json_encode }}\"
    mandatory-results=\"{{ diagnosticReport.getMandatoryDiagnosticResults()|json_encode }}\"
    optional-results=\"{{ diagnosticReport.getOptionalDiagnosticResults()|json_encode }}\"
    informational-results=\"{{ diagnosticReport.getInformationalResults()|json_encode }}\"
    is-installation=\"{{ isInstallation|default(null)|json_encode }}\"
></div>

{% endblock %}
", "@Installation/systemCheck.twig", "/var/www/html/plugins/Installation/templates/systemCheck.twig");
    }
}
