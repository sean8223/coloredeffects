SOURCES:=module.json module/coloredeffects.js lang/en.json

TARGETS:=$(foreach t,$(SOURCES),coloredeffects/$(t))

.PHONY: clean

coloredeffects.zip: $(TARGETS)
	zip -r coloredeffects.zip coloredeffects
	rm -rf coloredeffects

coloredeffects/%: %
	mkdir -p $(dir $@)
	cp $< $@

clean:
	find . -name "*~" -exec rm -f {} \;
	rm -rf coloredeffects coloredeffects.zip
